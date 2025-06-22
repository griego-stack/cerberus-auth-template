import {
  CreateUserLoginAttempsDTO,
  UserLoginAttempsEntity,
} from '../entities/login-attemps.entity';

export abstract class UserLoginAttempsRepository {
  abstract findAll(): Promise<UserLoginAttempsEntity[]>;
  abstract create(
    data: CreateUserLoginAttempsDTO,
  ): Promise<UserLoginAttempsEntity>;
}
