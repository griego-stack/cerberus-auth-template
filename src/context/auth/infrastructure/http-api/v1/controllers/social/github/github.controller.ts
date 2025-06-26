import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, Get, Query, Req, Res } from 'src/bootstrap';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { GithubSocialLoginUseCase } from 'src/context/auth/application';

@Controller(`${AUTH_API_V1_BASE_PATH}/social/github`)
export class GithubSocialLoginController {
  constructor(private readonly github: GithubSocialLoginUseCase) {}

  @Get()
  async run(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Query('code') code: string,
    @Query('redirect-url') redirectUrl: string,
    @Query('redirect-error-url') redirectErrorUrl: string,
  ) {
    return this.github.execute(req, res, {
      code,
      metadata: { redirectUrl, redirectErrorUrl },
    });
  }
}
