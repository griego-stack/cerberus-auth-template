import { JwtService } from '@nestjs/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Injectable } from 'src/bootstrap';
import {
  SessionExpiredException,
  UserEntity,
  UserRefreshTokenRepository,
  UserRepository,
} from 'src/context/auth/domain';
import { AppConfigService } from 'src/global/services/app-config.service';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly jwt: JwtService,
    private readonly refreshToken: UserRefreshTokenRepository,
    private readonly user: UserRepository,
  ) {}

  async execute(req: FastifyRequest, res: FastifyReply) {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) throw new SessionExpiredException();

    const token = await this.refreshToken.findOne(refresh_token);

    if (!token) throw new SessionExpiredException();
    if (token.revoked) throw new SessionExpiredException();

    const user = await this.user.findById(token.userId);
    if (!user) throw new SessionExpiredException();

    res.setCookie('access_token', this._generateAccessToken(user), {
      domain: req.hostname,
      expires: new Date(Date.now() + this.config.accessTokenAlive.time),
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.status(200).send();
  }

  _generateAccessToken(user: UserEntity) {
    return this.jwt.sign({
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    });
  }
}
