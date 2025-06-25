import { nanoid } from 'nanoid';
import { Injectable, InternalServerErrorException } from 'src/bootstrap';
import { AppConfigService } from 'src/global/services/app-config.service';
import {
  UserConfirmationTokenEntity,
  UserConfirmationTokenRepository,
  UserEmailAlreadyVerifiedException,
  UserNotFoundException,
  UserRepository,
} from 'src/context/auth/domain';
import { EmailService } from 'src/global/services/mail.service';
import { RefreshConfirmationTokenDTO } from './refresh-token.dto';

@Injectable()
export class UserRefreshConfirmationTokenUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly confirmationToken: UserConfirmationTokenRepository,
    private readonly mailer: EmailService,
    private readonly user: UserRepository,
  ) {}

  async execute(data: RefreshConfirmationTokenDTO) {
    const user = await this.user.findByEmail(data.email);

    if (!user) throw new UserNotFoundException();

    if (user.isEmailVerified) throw new UserEmailAlreadyVerifiedException();

    const token = this._createToken();
    const expirationToken = new Date(
      Date.now() + this.config.confirmationTokenAlive.time,
    );
    const confirmationUrl = `${data.metadata.redirectURL}?token=${token}`;

    try {
      await this.confirmationToken.invalidateOldTokens(user.id);

      const newConfirmationToken = UserConfirmationTokenEntity.create({
        userId: user.id,
        token,
        expiresAt: expirationToken,
      });
      await this.confirmationToken.create(newConfirmationToken);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'An unexpected error occurred while creating new confirm user account token',
      );
    }

    this.mailer
      .sendEmail({
        email: data.email,
        subject: `Confirm your account on ${this.config.serviceName}`,
        template: 'account-confirmation',
        context: {
          userName: user.username,
          serviceName: this.config.serviceName,
          confirmationUrl,
          expirationTime: this.config.confirmationTokenAlive.text,
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
