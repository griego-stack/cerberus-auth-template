import { Module } from 'src/bootstrap';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
