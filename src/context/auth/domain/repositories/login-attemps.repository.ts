import { UserLoginAttempsEntity } from '../entities/login-attemps.entity';

export abstract class UserLoginAttempsRepository {
  abstract create(
    data: UserLoginAttempsEntity,
  ): Promise<UserLoginAttempsEntity>;
}
