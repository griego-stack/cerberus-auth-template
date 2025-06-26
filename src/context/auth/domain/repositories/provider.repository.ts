import { UserProviderEntity } from '../entities/provider.entity';

export abstract class UserProviderRepository {
  abstract findOne(id: number): Promise<UserProviderEntity | null>;
}
