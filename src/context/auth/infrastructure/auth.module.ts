import { Module } from 'src/bootstrap';
import {
  ChangePasswordController,
  ConfirmChangePasswordController,
  ConfirmUserAccountController,
  CreateUserAccountController,
  RefreshConfirmationTokenController,
  RefreshTokenController,
  RequestChangePasswordController,
  UserLoginController,
  UserLogoutController,
} from './http-api';
import {
  ChangePasswordUseCase,
  ConfirmChangePasswordUseCase,
  ConfirmUserAccountUseCase,
  CreateUserAccountUseCase,
  RefreshTokenUseCase,
  RequestChangePasswordUseCase,
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
    RefreshTokenController,
    RequestChangePasswordController,
    ConfirmChangePasswordController,
    ChangePasswordController,
  ],
  providers: [
    ConfirmUserAccountUseCase,
    CreateUserAccountUseCase,
    UserLoginUseCase,
    UserRefreshConfirmationTokenUseCase,
    UserLogoutUseCase,
    RefreshTokenUseCase,
    RequestChangePasswordUseCase,
    ConfirmChangePasswordUseCase,
    ChangePasswordUseCase,
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
    RefreshTokenUseCase,
    RequestChangePasswordUseCase,
    UserRefreshConfirmationTokenUseCase,
    ConfirmChangePasswordUseCase,
    ChangePasswordUseCase,
    InDatabaseUserConfirmationTokenRepository,
    InDatabaseUserLoginAttemptsRepository,
    InDatabaseUserProfileRepository,
    InDatabaseUserRefreshTokenRepository,
    InDatabaseUserRepository,
  ],
})
export class AuthModule {}
