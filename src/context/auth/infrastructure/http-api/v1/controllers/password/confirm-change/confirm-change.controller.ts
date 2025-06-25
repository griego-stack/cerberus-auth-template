import { Body, Controller, Post, Query } from 'src/bootstrap';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { ConfirmChangePasswordUseCase } from 'src/context/auth/application';
import { ConfirmChangePasswordDTO } from './confirm-change.dto';

@Controller(`${AUTH_API_V1_BASE_PATH}/password/confirm-change`)
export class ConfirmChangePasswordController {
  constructor(private readonly confirmChange: ConfirmChangePasswordUseCase) {}

  @Post()
  run(@Query('token') token: string, @Body() data: ConfirmChangePasswordDTO) {
    return this.confirmChange.execute({ newPassword: data.password, token });
  }
}
