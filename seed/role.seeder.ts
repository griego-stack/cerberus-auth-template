import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../src/context/auth/infrastructure/persistence/entities/role.entity';

export default class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Role);
    await repo.insert([
      // USER should always be the first role
      // If you want to change the order, make sure to update the logic that relies on this
      // For example, the CreateUserAccountUseCase in src/context/auth/application/account/create-account/create-account.use-case.ts
      { name: 'user' },
      { name: 'admin' },
    ]);
  }
}
