import { Injectable } from 'src/bootstrap';
import {
  InvalidTokenException,
  TokenRequiredException,
  UserConfirmationTokenRepository,
  UserNotFoundException,
  UserRepository,
} from 'src/context/auth/domain';
import { AuthSharedService } from '../../shared/auth-shared.service';

@Injectable()
export class ConfirmUserAccountUseCase {
  constructor(
    private readonly confirmToken: UserConfirmationTokenRepository,
    private readonly shared: AuthSharedService,
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

    const user = await this.user.findById(tokenInDatabase.userId);
    if (!user) throw new UserNotFoundException();

    await this.confirmToken.useToken(tokenInDatabase.id);
    await this.user.confirmEmail(user.id);

    this.shared.sendWelcomeEmail(user).catch((error) => {
      // Should be logged
      console.error('Error sending confirmation email:', error);
    });
  }
}
