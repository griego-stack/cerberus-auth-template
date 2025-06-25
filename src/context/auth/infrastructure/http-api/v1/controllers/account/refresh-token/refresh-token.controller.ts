import { Body, Controller, HttpCode, Post, Query } from 'src/bootstrap';
import { AUTH_API_V1_BASE_PATH } from '../../../constants';
import { UserRefreshConfirmationTokenUseCase } from 'src/context/auth/application';
import { RefreshConfirmationTokenDTO } from './refresh-token.dto';

@Controller(`${AUTH_API_V1_BASE_PATH}/account/refresh-token`)
export class RefreshConfirmationTokenController {
  constructor(
    private readonly refreshToken: UserRefreshConfirmationTokenUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  run(
    @Query('redirect-url') redirectURL: string,
    @Body() data: RefreshConfirmationTokenDTO,
  ) {
    return this.refreshToken.execute({
      ...data,
      metadata: { redirectURL },
    });
  }
}
