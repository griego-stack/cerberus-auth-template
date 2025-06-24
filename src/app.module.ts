import { Module } from 'src/bootstrap';
import { GlobalModule } from './global/global.module';
import { AuthModule } from './context/auth/infrastructure/auth.module';

@Module({
  imports: [GlobalModule, AuthModule],
})
export class AppModule {}
