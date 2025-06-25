import * as argon2 from 'argon2';
import { FastifyReply, FastifyRequest } from 'fastify';
import { nanoid } from 'nanoid';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from 'src/bootstrap';
import {
  UserEntity,
  UserLoginAttempsEntity,
  UserLoginAttempsRepository,
  UserRefreshTokenEntity,
  UserRefreshTokenRepository,
  UserRepository,
} from 'src/context/auth/domain';
import { UserNotFoundException } from 'src/context/auth/domain/exceptions/user-not-found.exception';
import { UserEmailNotVerifiedException } from 'src/context/auth/domain/exceptions/user-email-not-verified.exception';
import { UserInactiveException } from 'src/context/auth/domain/exceptions/user-inactive.exception';
import { UserInvalidCredentialsException } from 'src/context/auth/domain/exceptions/user-invalid-credentials.exception';
import { AppConfigService } from 'src/global/services/app-config.service';
import { UserLoginDTO } from './login.dto';

@Injectable()
export class UserLoginUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly jwt: JwtService,
    private readonly loginAttempts: UserLoginAttempsRepository,
    private readonly refreshToken: UserRefreshTokenRepository,
    private readonly user: UserRepository,
  ) {}

  async execute(req: FastifyRequest, res: FastifyReply, data: UserLoginDTO) {
    let user: UserEntity | null = null;

    if (!data.username && data.email)
      user = await this.user.findByEmail(data.email);
    else if (data.username && !data.email)
      user = await this.user.findByUsername(data.username);

    try {
      if (!user) throw new UserNotFoundException();
      else if (!user.isEmailVerified) throw new UserEmailNotVerifiedException();
      else if (!user.isActive) throw new UserInactiveException();

      const isPasswordMatch = await this._comparePassword(
        data.password,
        user.password,
      );

      if (!isPasswordMatch) throw new UserInvalidCredentialsException();
    } catch (error) {
      await this.loginAttempts.create(
        UserLoginAttempsEntity.create({
          userIdentificator: data.username || data.email,
          ipAddress: req.ip,
          deviceInfo: req.headers['user-agent'] || '',
          success: false,
        }),
      );

      throw error;
    }

    const sessionTokens = this._generateSessionTokens(user);

    const newRefreshToken = UserRefreshTokenEntity.create({
      userId: user.id,
      token: sessionTokens.refreshToken,
      expiresAt: sessionTokens.refreshTokenExpiration,
      deviceInfo: req.headers['user-agent'] || '',
      ipAddress: req.ip,
    });
    await this.refreshToken.create(newRefreshToken);

    await this.user.updateLastlogin(user.id);

    res
      .setCookie('access_token', sessionTokens.accessToken, {
        domain: req.hostname,
        expires: new Date(Date.now() + this.config.accessTokenAlive.time),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .setCookie('refresh_token', sessionTokens.refreshToken, {
        domain: req.hostname,
        expires: new Date(Date.now() + this.config.refreshTokenAlive.time),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

    await this.loginAttempts.create(
      UserLoginAttempsEntity.create({
        userIdentificator: data.username || data.email,
        ipAddress: req.ip,
        deviceInfo: req.headers['user-agent'] || '',
        success: true,
      }),
    );

    res.status(200).send();
  }

  _comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }

  _generateSessionTokens(user: UserEntity) {
    return {
      accessToken: this.jwt.sign({
        id: user.id,
        email: user.email,
        roleId: user.roleId,
      }),
      refreshToken: nanoid(32),
      refreshTokenExpiration: new Date(
        Date.now() + this.config.refreshTokenAlive.time,
      ),
    };
  }
}
