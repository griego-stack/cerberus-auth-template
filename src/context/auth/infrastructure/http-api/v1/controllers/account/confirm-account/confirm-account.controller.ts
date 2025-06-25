import { Controller, Get, Query } from 'src/bootstrap';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { ConfirmUserAccountUseCase } from 'src/context/auth/application';

@Controller(`${AUTH_API_V1_BASE_PATH}/account/confirm`)
export class ConfirmUserAccountController {
  constructor(private readonly confirmUserAccount: ConfirmUserAccountUseCase) {}

  @Get()
  run(@Query('token') token: string) {
    return this.confirmUserAccount.execute(token);
  }
}
