import { Module } from 'src/bootstrap';
import {
  ConfirmUserAccountController,
  CreateUserAccountController,
  RefreshConfirmationTokenController,
  UserLoginController,
  UserLogoutController,
} from './http-api';
import {
  ConfirmUserAccountUseCase,
  CreateUserAccountUseCase,
  UserLoginUseCase,
  UserLogoutUseCase,
  UserRefreshConfirmationTokenUseCase,
} from '../application';
import {
  UserConfirmationTokenRepository,
  UserLoginAttempsRepository,
  UserProfileRepository,
  UserRefreshTokenRepository,
  UserRepository,
} from '../domain';
import {
  InDatabaseUserConfirmationTokenRepository,
  InDatabaseUserLoginAttemptsRepository,
  InDatabaseUserProfileRepository,
  InDatabaseUserRefreshTokenRepository,
  InDatabaseUserRepository,
} from './persistence';

@Module({
  controllers: [
    ConfirmUserAccountController,
    CreateUserAccountController,
    UserLoginController,
    RefreshConfirmationTokenController,
    UserLogoutController,
  ],
  providers: [
    ConfirmUserAccountUseCase,
    CreateUserAccountUseCase,
    UserLoginUseCase,
    UserRefreshConfirmationTokenUseCase,
    UserLogoutUseCase,
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
    ConfirmUserAccountUseCase,
    UserLoginUseCase,
    UserLogoutUseCase,
    UserRefreshConfirmationTokenUseCase,
    InDatabaseUserConfirmationTokenRepository,
    InDatabaseUserLoginAttemptsRepository,
    InDatabaseUserProfileRepository,
    InDatabaseUserRefreshTokenRepository,
    InDatabaseUserRepository,
  ],
})
export class AuthModule {}
