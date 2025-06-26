import * as argon2 from 'argon2';
import { FastifyRequest } from 'fastify';
import { Injectable } from 'src/bootstrap';
import { ChangePasswordDTO } from './change.dto';
import {
  InvalidUserProviderException,
  SessionExpiredException,
  UserInvalidCredentialsException,
  UserRefreshTokenRepository,
  UserRepository,
} from 'src/context/auth/domain';
import { AppConfigService } from 'src/global/services/app-config.service';
import { EmailService } from 'src/global/services/mail.service';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly mailer: EmailService,
    private readonly user: UserRepository,
    private readonly refreshToken: UserRefreshTokenRepository,
  ) {}

  async execute(req: FastifyRequest, data: ChangePasswordDTO) {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) throw new SessionExpiredException();

    const token = await this.refreshToken.findOne(refresh_token);

    if (!token || token.revoked) throw new SessionExpiredException();

    const user = await this.user.findById(token.userId);
    if (!user) throw new SessionExpiredException();
    if (user.providerId !== this.config.googleProviderId || !user.password)
      throw new InvalidUserProviderException();

    if (!(await this._comparePassword(data.oldPassword, user.password)))
      throw new UserInvalidCredentialsException();

    await this.user.changePassword(
      user.id,
      await this._hashPassword(data.newPassword),
    );

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

  _comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }
}
