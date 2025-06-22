import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../src/context/auth/infrastructure/persistence/entities/role.entity';

export default class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Role);
    await repo.insert([{ name: 'user' }, { name: 'admin' }]);
  }
}
