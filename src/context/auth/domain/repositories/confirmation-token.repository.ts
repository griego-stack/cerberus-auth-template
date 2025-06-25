import { UserConfirmationTokenEntity } from '../entities/confirmation-token.entity';

export abstract class UserConfirmationTokenRepository {
  abstract findOne(token: string): Promise<UserConfirmationTokenEntity | null>;
  abstract useToken(id: number): Promise<void>;
  abstract invalidateOldTokens(userId: number): Promise<void>;
  abstract create(
    data: UserConfirmationTokenEntity,
  ): Promise<UserConfirmationTokenEntity>;
}
