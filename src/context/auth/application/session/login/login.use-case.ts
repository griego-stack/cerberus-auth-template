import { FastifyReply, FastifyRequest } from 'fastify';
import { Injectable } from 'src/bootstrap';
import {
  InvalidUserProviderException,
  IPBlockedException,
  UserEmailNotVerifiedException,
  UserEntity,
  UserInactiveException,
  UserInvalidCredentialsException,
  UserLoginAttempsRepository,
  UserNotFoundException,
  UserRepository,
} from 'src/context/auth/domain';
import { AppConfigService } from 'src/global/services/app-config.service';
import { UserLoginDTO } from './login.dto';
import { AuthSharedService } from '../../shared/auth-shared.service';

@Injectable()
export class UserLoginUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly loginAttempts: UserLoginAttempsRepository,
    private readonly shared: AuthSharedService,
    private readonly user: UserRepository,
  ) {}

  async execute(req: FastifyRequest, res: FastifyReply, data: UserLoginDTO) {
    if (await this._isBannedIp(req.ip)) throw new IPBlockedException();

    let user: UserEntity | null = null;

    if (!data.username && data.email)
      user = await this.user.findByEmail(data.email);
    else if (data.username && !data.email)
      user = await this.user.findByUsername(data.username);

    try {
      if (!user) throw new UserNotFoundException();
      else if (!user.isEmailVerified) throw new UserEmailNotVerifiedException();
      else if (!user.isActive) throw new UserInactiveException();
      else if (
        user.providerId !== this.config.googleProviderId ||
        !user.password
      )
        throw new InvalidUserProviderException();

      const isPasswordMatch = await this.shared.comparePassword(
        data.password,
        user.password,
      );

      if (!isPasswordMatch) throw new UserInvalidCredentialsException();
    } catch (error) {
      await this.shared.createLoginAttemp(
        req,
        data.username || data.email,
        user ? user.id : undefined,
      );
      throw error;
    }

    await this.shared.generateSessionTokens(req, res, user);

    res.status(200).send();
  }

  async _isBannedIp(ip: string): Promise<boolean> {
    const recentAttemps = await this.loginAttempts.countIpInLastWindow(
      ip,
      this.config.windowAttemptsWindowTime,
    );

    return recentAttemps >= this.config.maxAttemps;
  }
}
