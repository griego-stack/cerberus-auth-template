import { Module } from 'src/bootstrap';
import {
  ChangePasswordController,
  ConfirmChangePasswordController,
  ConfirmUserAccountController,
  CreateUserAccountController,
  GithubSocialLoginController,
  GoogleSocialLoginController,
  RefreshConfirmationTokenController,
  RefreshTokenController,
  RequestChangePasswordController,
  UserLoginController,
  UserLogoutController,
} from './http-api';
import {
  AuthSharedService,
  ChangePasswordUseCase,
  ConfirmChangePasswordUseCase,
  ConfirmUserAccountUseCase,
  CreateUserAccountUseCase,
  GithubSocialLoginUseCase,
  GoogleSocialLoginUseCase,
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
    // Account
    ConfirmUserAccountController,
    CreateUserAccountController,
    RefreshConfirmationTokenController,
    // Session
    UserLoginController,
    UserLogoutController,
    RefreshTokenController,
    // Password
    RequestChangePasswordController,
    ConfirmChangePasswordController,
    ChangePasswordController,
    // Social
    GoogleSocialLoginController,
    GithubSocialLoginController,
  ],
  providers: [
    // Shared
    AuthSharedService,
    // Account
    ConfirmUserAccountUseCase,
    CreateUserAccountUseCase,
    UserRefreshConfirmationTokenUseCase,
    // Session
    UserLoginUseCase,
    UserLogoutUseCase,
    RefreshTokenUseCase,
    // Password
    RequestChangePasswordUseCase,
    ConfirmChangePasswordUseCase,
    ChangePasswordUseCase,
    // Social
    GoogleSocialLoginUseCase,
    GithubSocialLoginUseCase,
    // Repositories
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
    // Account
    CreateUserAccountUseCase,
    ConfirmUserAccountUseCase,
    UserRefreshConfirmationTokenUseCase,
    // Session
    UserLoginUseCase,
    UserLogoutUseCase,
    RefreshTokenUseCase,
    // Password
    RequestChangePasswordUseCase,
    ConfirmChangePasswordUseCase,
    ChangePasswordUseCase,
    // Social
    GoogleSocialLoginUseCase,
    GithubSocialLoginUseCase,
    // Repositories
    InDatabaseUserConfirmationTokenRepository,
    InDatabaseUserLoginAttemptsRepository,
    InDatabaseUserProfileRepository,
    InDatabaseUserRefreshTokenRepository,
    InDatabaseUserRepository,
  ],
})
export class AuthModule {}
