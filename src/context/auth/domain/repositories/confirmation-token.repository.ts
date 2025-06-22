import {
  CreateUserConfirmationTokenDTO,
  UserConfirmationTokenEntity,
} from '../entities/confirmation-token.entity';

export abstract class UserConfirmationTokenRepository {
  abstract findOne(token: string): Promise<UserConfirmationTokenEntity | null>;
  abstract create(
    data: CreateUserConfirmationTokenDTO,
  ): Promise<UserConfirmationTokenEntity>;
}
