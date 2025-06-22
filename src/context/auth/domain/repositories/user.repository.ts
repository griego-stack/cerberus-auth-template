import { CreateUserDTO, UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findAll(): Promise<UserEntity[]>;
  abstract create(data: CreateUserDTO): Promise<UserEntity>;
}
