import { UserRefreshTokenEntity } from '../entities/refresh-token.entity';

export abstract class UserRefreshTokenRepository {
  abstract findOne(token: string): Promise<UserRefreshTokenEntity | null>;
  abstract revokeToken(token: string): Promise<void>;
  abstract invalidateOldTokens(userId: number): Promise<void>;
  abstract create(
    data: UserRefreshTokenEntity,
  ): Promise<UserRefreshTokenEntity>;
}
