import {
  CreateUserProviderDTO,
  UserProviderEntity,
} from '../entities/provider.entity';

export abstract class UserProviderRepository {
  abstract findAll(): Promise<UserProviderEntity[]>;
  abstract create(data: CreateUserProviderDTO): Promise<UserProviderEntity>;
}
