import { Module } from 'src/bootstrap';
import { CreateUserAccountController } from './http-api';
import { CreateUserAccountUseCase } from '../application';
import {
  UserConfirmationTokenRepository,
  UserProfileRepository,
  UserRepository,
} from '../domain';
import {
  InDatabaseUserConfirmationTokenRepository,
  InDatabaseUserProfileRepository,
  InDatabaseUserRepository,
} from './persistence';

@Module({
  controllers: [CreateUserAccountController],
  providers: [
    CreateUserAccountUseCase,
    {
      provide: UserConfirmationTokenRepository,
      useClass: InDatabaseUserConfirmationTokenRepository,
    },
    {
      provide: UserProfileRepository,
      useClass: InDatabaseUserProfileRepository,
    },
    {
      provide: UserRepository,
      useClass: InDatabaseUserRepository,
    },
  ],
})
export class AuthModule {}
