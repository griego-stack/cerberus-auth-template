import {
  CreateUserRefreshTokenDTO,
  UserRefreshTokenEntity,
} from '../entities/refresh-token.entity';

export abstract class UserRefreshTokenRepository {
  abstract findAll(): Promise<UserRefreshTokenEntity[]>;
  abstract create(
    data: CreateUserRefreshTokenDTO,
  ): Promise<UserRefreshTokenEntity>;
}
