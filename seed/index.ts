import chalk from 'chalk';
import { DataSource } from 'typeorm';
import { runSeeder } from 'typeorm-extension';

import ProviderSeeder from './provider.seeder';
import RoleSeeder from './role.seeder';
import {
  Provider,
  Role,
  User,
  UserConfirmationToken,
  UserProfile,
} from '../src/context/auth/infrastructure/persistence/entities';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'mysql',
  database: 'cerbeus',
  synchronize: true,
  entities: [UserConfirmationToken, UserProfile, Provider, Role, User],
});

async function main() {
  console.log(chalk.cyan('🚀 Connecting to database...'));
  const ds = await dataSource.initialize();

  if (ds.isInitialized) {
    console.log(chalk.green('🟢 Database connected.'));
  } else {
    console.log(chalk.red('🔴 Failed to connect to the database.'));
    return;
  }

  try {
    console.log(chalk.blue('🔄 Running ProviderSeeder...'));
    await runSeeder(ds, ProviderSeeder);
    console.log(chalk.green('✅ ProviderSeeder completed.'));

    console.log(chalk.blue('🔄 Running RoleSeeder...'));
    await runSeeder(ds, RoleSeeder);
    console.log(chalk.green('✅ RoleSeeder completed.'));
  } catch (error) {
    console.error(chalk.red('❌ Seeder failed:'), error);
  } finally {
    await ds.destroy();
    console.log(chalk.gray('🧹 DataSource destroyed. Seed process finished.'));
  }
}

void main();
