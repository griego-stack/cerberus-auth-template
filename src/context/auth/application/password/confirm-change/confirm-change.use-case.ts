import * as argon2 from 'argon2';
import { Injectable } from 'src/bootstrap';
import { ConfirmChangePasswordDTO } from './confirm-change.dto';
import {
  InvalidTokenException,
  TokenRequiredException,
  UserConfirmationTokenRepository,
  UserNotFoundException,
  UserRefreshTokenRepository,
  UserRepository,
} from 'src/context/auth/domain';
import { AppConfigService } from 'src/global/services/app-config.service';
import { EmailService } from 'src/global/services/mail.service';

@Injectable()
export class ConfirmChangePasswordUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly mailer: EmailService,
    private readonly confirmToken: UserConfirmationTokenRepository,
    private readonly refreshToken: UserRefreshTokenRepository,
    private readonly user: UserRepository,
  ) {}

  async execute(data: ConfirmChangePasswordDTO) {
    if (!data.token) throw new TokenRequiredException();

    const token = await this.confirmToken.findOne(data.token);

    if (!token) throw new InvalidTokenException();
    else if (token.isExpired()) throw new InvalidTokenException();
    else if (token.isUsed) throw new InvalidTokenException();

    const user = await this.user.findById(token.userId);

    if (!user) throw new UserNotFoundException();

    await this.user.changePassword(
      user.id,
      await this._hashPassword(data.newPassword),
    );

    await this.confirmToken.invalidateOldTokens(user.id);
    await this.refreshToken.invalidateOldTokens(user.id);

    this.mailer
      .sendEmail({
        email: user.email,
        subject: `Your ${this.config.serviceName} password was changed`,
        template: 'password-changed',
        context: {
          userName: user.username,
          serviceName: this.config.serviceName,
        },
      })
      .catch((error) => {
        // Should be logged
        console.error('Error sending confirmation email:', error);
      });
  }

  _hashPassword(password: string) {
    return argon2.hash(password);
  }
}
