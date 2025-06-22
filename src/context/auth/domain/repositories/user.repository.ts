import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findAll(): Promise<UserEntity[]>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract create(data: UserEntity): Promise<UserEntity>;
}
