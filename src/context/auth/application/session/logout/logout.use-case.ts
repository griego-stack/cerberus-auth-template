import { FastifyReply, FastifyRequest } from 'fastify';
import { Injectable } from 'src/bootstrap';
import { UserRefreshTokenRepository } from 'src/context/auth/domain';

@Injectable()
export class UserLogoutUseCase {
  constructor(private readonly refreshToken: UserRefreshTokenRepository) {}

  async execute(req: FastifyRequest, res: FastifyReply) {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) return;

    await this.refreshToken.revokeToken(refresh_token);

    res.clearCookie('access_token', {
      domain: req.hostname,
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });

    res.clearCookie('refresh_token', {
      domain: req.hostname,
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });

    res.status(200).send();
  }
}
