import { nanoid } from 'nanoid';
import { Injectable, InternalServerErrorException } from 'src/bootstrap';
import { RequestChangePasswordDTO } from './request-change.dto';
import {
  InvalidUserProviderException,
  UserConfirmationTokenEntity,
  UserConfirmationTokenRepository,
  UserEmailNotVerifiedException,
  UserNotFoundException,
  UserRepository,
} from 'src/context/auth/domain';
import { AppConfigService } from 'src/global/services/app-config.service';
import { EmailService } from 'src/global/services/mail.service';

@Injectable()
export class RequestChangePasswordUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly confirmationToken: UserConfirmationTokenRepository,
    private readonly mailer: EmailService,
    private readonly user: UserRepository,
  ) {}

  async execute(data: RequestChangePasswordDTO) {
    const user = await this.user.findByEmail(data.email);

    if (!user) throw new UserNotFoundException();
    if (user.providerId !== this.config.googleProviderId || !user.password)
      throw new InvalidUserProviderException();

    if (!user.isEmailVerified) throw new UserEmailNotVerifiedException();

    const token = this._createToken();
    const expirationToken = new Date(
      Date.now() + this.config.requestChangePasswordAlive.time,
    );
    const confirmationUrl = `${data.metadata.redirectURL}?token=${token}`;

    try {
      const newConfirmationToken = UserConfirmationTokenEntity.create({
        userId: user.id,
        token: token,
        expiresAt: expirationToken,
      });

      await this.confirmationToken.create(newConfirmationToken);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'An unexpected error occurred while requesting a password change.',
      );
    }

    this.mailer
      .sendEmail({
        email: data.email,
        subject: `Reset your ${this.config.serviceName} password`,
        template: 'request-change-password',
        context: {
          userName: user.username,
          resetUrl: confirmationUrl,
          expirationTime: this.config.requestChangePasswordAlive.text,
          serviceName: this.config.serviceName,
        },
      })
      .catch((error) => {
        // Should be logged
        console.error('Error sending confirmation email:', error);
      });
  }

  _createToken() {
    return nanoid(32);
  }
}
