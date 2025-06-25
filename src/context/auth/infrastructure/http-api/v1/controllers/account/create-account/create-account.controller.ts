import { Body, Controller, Post, Query } from 'src/bootstrap';
import { CreateUserAccountUseCase } from 'src/context/auth/application/account/create-account/create-account.use-case';
import { CreateUserAccountDTO } from './create-account.dto';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';

@Controller(`${AUTH_API_V1_BASE_PATH}/account/create`)
export class CreateUserAccountController {
  constructor(private readonly createUserAccount: CreateUserAccountUseCase) {}

  @Post()
  run(
    @Query('redirect-url') redirectURL: string,
    @Body() data: CreateUserAccountDTO,
  ) {
    return this.createUserAccount.execute({
      ...data,
      metadata: { redirectURL },
    });
  }
}
