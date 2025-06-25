import { FastifyReply, FastifyRequest } from 'fastify';
import { Injectable } from 'src/bootstrap';

@Injectable()
export class UserLogoutUseCase {
  execute(req: FastifyRequest, res: FastifyReply) {
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
