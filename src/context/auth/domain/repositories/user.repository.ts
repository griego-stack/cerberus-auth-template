import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findAll(): Promise<UserEntity[]>;
  abstract findById(id: number): Promise<UserEntity | null>;
  abstract findByUsername(username: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract create(data: UserEntity): Promise<UserEntity>;
  abstract updateLastlogin(userId: number): Promise<boolean>;
  abstract confirmEmail(userId: number): Promise<boolean>;
  abstract changePassword(userId: number, password: string): Promise<boolean>;
}
