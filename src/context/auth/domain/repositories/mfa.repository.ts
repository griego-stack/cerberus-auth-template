import { CreateUserMFADTO, UserMFAEntity } from '../entities/mfa.entity';

export abstract class UserMFARepository {
  abstract findAll(): Promise<UserMFAEntity[]>;
  abstract create(data: CreateUserMFADTO): Promise<UserMFAEntity>;
}
