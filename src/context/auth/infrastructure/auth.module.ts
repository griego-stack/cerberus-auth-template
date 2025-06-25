import { Module } from 'src/bootstrap';
import { CreateUserAccountController } from './http-api';
import { CreateUserAccountUseCase } from '../application';
import {
  UserConfirmationTokenRepository,
  UserLoginAttempsRepository,
  UserProfileRepository,
  UserRefreshTokenRepository,
  UserRepository,
} from '../domain';
import {
  InDatabaseUserConfirmationTokenRepository,
  InDatabaseUserProfileRepository,
  InDatabaseUserRefreshTokenRepository,
  InDatabaseUserRepository,
} from './persistence';
import { UserLoginController } from './http-api/v1/controllers/session/login/login.controller';
import { UserLoginUseCase } from '../application/session/login/login.use-case';
import { InDatabaseUserLoginAttemptsRepository } from './persistence/repositories/in-db-login-attemps.repository';

@Module({
  controllers: [CreateUserAccountController, UserLoginController],
  providers: [
    CreateUserAccountUseCase,
    UserLoginUseCase,
    {
      provide: UserConfirmationTokenRepository,
      useClass: InDatabaseUserConfirmationTokenRepository,
    },
    {
      provide: UserLoginAttempsRepository,
      useClass: InDatabaseUserLoginAttemptsRepository,
    },
    {
      provide: UserProfileRepository,
      useClass: InDatabaseUserProfileRepository,
    },
    {
      provide: UserRefreshTokenRepository,
      useClass: InDatabaseUserRefreshTokenRepository,
    },
    {
      provide: UserRepository,
      useClass: InDatabaseUserRepository,
    },
    InDatabaseUserConfirmationTokenRepository,
    InDatabaseUserLoginAttemptsRepository,
    InDatabaseUserProfileRepository,
    InDatabaseUserRefreshTokenRepository,
    InDatabaseUserRepository,
  ],
  exports: [
    CreateUserAccountUseCase,
    InDatabaseUserConfirmationTokenRepository,
    InDatabaseUserLoginAttemptsRepository,
    InDatabaseUserProfileRepository,
    InDatabaseUserRefreshTokenRepository,
    InDatabaseUserRepository,
  ],
})
export class AuthModule {}
