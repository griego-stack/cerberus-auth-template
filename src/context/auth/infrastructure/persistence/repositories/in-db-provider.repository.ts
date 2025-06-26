import { Injectable } from 'src/bootstrap';
import {
  UserProviderEntity,
  UserProviderRepository,
} from 'src/context/auth/domain';
import { Provider } from '../entities';

@Injectable()
export class InDatabaseProviderRepository implements UserProviderRepository {
  async findOne(id: number): Promise<UserProviderEntity | null> {
    const provider = await Provider.findOne({ where: { id } });
    return provider ? this._createProviderEntityInstance(provider) : null;
  }

  _createProviderEntityInstance(data: Provider): UserProviderEntity {
    return new UserProviderEntity({
      id: data.id,
      name: data.name,
    });
  }
}
