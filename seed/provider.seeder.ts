import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Provider } from '../src/context/auth/infrastructure/persistence/entities/provider.entity';

export default class ProviderSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Provider);
    await repo.insert([
      // EMAIL should always be the first provider
      // If you want to change the order, make sure to update the logic that relies on this
      // For example, the CreateUserAccountUseCase in src/context/auth/application/account/create-account/create-account.use-case.ts
      { name: 'email' },
      { name: 'google' },
      { name: 'github' },
    ]);
  }
}
