import * as argon2 from 'argon2';
import { nanoid } from 'nanoid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from 'src/bootstrap';
import {
  UserEntity,
  UserLoginAttempsEntity,
  UserLoginAttempsRepository,
  UserRefreshTokenEntity,
  UserRefreshTokenRepository,
  UserRepository,
} from '../../domain';
import { AppConfigService } from 'src/global/services/app-config.service';
import { CookieSerializeOptions } from '@fastify/cookie';
import { EmailService } from 'src/global/services/mail.service';

@Injectable()
export class AuthSharedService {
  constructor(
    private readonly config: AppConfigService,
    private readonly jwt: JwtService,
    private readonly loginAttempts: UserLoginAttempsRepository,
    private readonly mailer: EmailService,
    private readonly refreshToken: UserRefreshTokenRepository,
    private readonly user: UserRepository,
  ) {}

  ACCESS_TOKEN = 'access_token';
  REFRESH_TOKEN = 'refresh_token';

  cookieConfig: CookieSerializeOptions = {
    path: '/',
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };

  createToken() {
    return nanoid(32);
  }

  async generateSessionTokens(
    req: FastifyRequest,
    res: FastifyReply,
    user: UserEntity,
  ) {
    const sessionTokens = {
      ...this.generateRefreshToken(),
      accessToken: this.generateAccessToken(user),
    };

    const newRefreshToken = UserRefreshTokenEntity.create({
      userId: user.id,
      token: sessionTokens.refreshToken,
      expiresAt: sessionTokens.expiration,
      deviceInfo: req.headers['user-agent'] || '',
      ipAddress: req.ip,
    });
    await this.refreshToken.create(newRefreshToken);
    await this.user.updateLastlogin(user.id);

    res
      .setCookie(this.ACCESS_TOKEN, sessionTokens.accessToken, {
        ...this.cookieConfig,
        domain: req.hostname,
        expires: new Date(Date.now() + this.config.accessTokenAlive.time),
      })
      .setCookie(this.REFRESH_TOKEN, sessionTokens.refreshToken, {
        ...this.cookieConfig,
        domain: req.hostname,
        expires: sessionTokens.expiration,
      });

    await this.createLoginAttemp(req, user.email, user.id, true);
  }

  generateAccessToken(user: UserEntity) {
    return this.jwt.sign({
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    });
  }

  generateRefreshToken() {
    return {
      refreshToken: this.createToken(),
      expiration: new Date(Date.now() + this.config.refreshTokenAlive.time),
    };
  }

  hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  comparePassword(plain: string, hashed: string): Promise<boolean> {
    return argon2.verify(hashed, plain);
  }

  async createLoginAttemp(
    req: FastifyRequest,
    userIdentificator?: string,
    userId?: number,
    success = false,
  ) {
    await this.loginAttempts.create(
      UserLoginAttempsEntity.create({
        userId: userId,
        userIdentificator,
        ipAddress: req.ip,
        deviceInfo: req.headers['user-agent'] || '',
        success,
      }),
    );
  }

  async generateUsername(email: string) {
    let posibleUsername = email.split('@')[0];

    const user = await this.user.findByUsername(posibleUsername);

    if (user) posibleUsername += nanoid(15);

    return posibleUsername;
  }

  async sendWelcomeEmail(user: UserEntity) {
    await this.mailer.sendEmail({
      email: user.email,
      subject: `Confirm your account on ${this.config.serviceName}`,
      template: 'account-created',
      context: {
        userName: user.username,
        serviceName: this.config.serviceName,
      },
    });
  }
}
