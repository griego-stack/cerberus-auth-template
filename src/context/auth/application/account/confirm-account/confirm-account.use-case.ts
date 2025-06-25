import { Injectable } from 'src/bootstrap';
import {
  InvalidTokenException,
  TokenRequiredException,
  UserConfirmationTokenRepository,
  UserRepository,
} from 'src/context/auth/domain';

@Injectable()
export class ConfirmUserAccountUseCase {
  constructor(
    private readonly confirmToken: UserConfirmationTokenRepository,
    private readonly user: UserRepository,
  ) {}

  async execute(token: string) {
    if (!token) throw new TokenRequiredException();
    else if (token.length < 32) throw new InvalidTokenException();

    const tokenInDatabase = await this.confirmToken.findOne(token);

    if (
      !tokenInDatabase ||
      tokenInDatabase.isUsed ||
      tokenInDatabase.isExpired()
    )
      throw new InvalidTokenException();

    await this.confirmToken.useToken(tokenInDatabase.id);
    await this.user.confirmEmail(tokenInDatabase.userId);
  }
}
