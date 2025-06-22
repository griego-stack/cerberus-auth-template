import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Provider } from '../src/context/auth/infrastructure/persistence/entities/provider.entity';

export default class ProviderSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Provider);
    await repo.insert([
      { name: 'email' },
      { name: 'google' },
      { name: 'github' },
    ]);
  }
}
