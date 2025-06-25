import { Body, Controller, Post, Query } from 'src/bootstrap';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { RequestChangePasswordDTO } from './request-change.dto';
import { RequestChangePasswordUseCase } from 'src/context/auth/application';

@Controller(`${AUTH_API_V1_BASE_PATH}/password/request-change`)
export class RequestChangePasswordController {
  constructor(
    private readonly requestChangePassword: RequestChangePasswordUseCase,
  ) {}

  @Post()
  run(
    @Query('redirect-url') redirectURL: string,
    @Body() data: RequestChangePasswordDTO,
  ) {
    return this.requestChangePassword.execute({
      ...data,
      metadata: { redirectURL },
    });
  }
}
