import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, Get, Req, Res } from 'src/bootstrap';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { UserLogoutUseCase } from 'src/context/auth/application';

@Controller(`${AUTH_API_V1_BASE_PATH}/session/logout`)
export class UserLogoutController {
  constructor(private readonly login: UserLogoutUseCase) {}

  @Get()
  run(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return this.login.execute(req, res);
  }
}
