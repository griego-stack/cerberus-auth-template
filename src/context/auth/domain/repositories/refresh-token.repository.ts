import { UserRefreshTokenEntity } from '../entities/refresh-token.entity';

export abstract class UserRefreshTokenRepository {
  abstract findOne(token: string): Promise<UserRefreshTokenEntity | null>;
  abstract create(
    data: UserRefreshTokenEntity,
  ): Promise<UserRefreshTokenEntity>;
}
