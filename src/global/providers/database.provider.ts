import { DataSource } from 'typeorm';
import { AppConfigService } from '../services/app-config.service';

export const databaseProviders = [
  {
    inject: [AppConfigService],
    provide: 'DATA_SOURCE',
    useFactory: async (app: AppConfigService) => {
      const databaseConfig = app.mainDatabase;
      const dataSource = new DataSource({
        type: databaseConfig.type,
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.database,
        timezone: 'Z',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
