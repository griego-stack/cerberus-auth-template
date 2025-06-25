import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWTProvider } from './providers/jwt.provider';
import { AppConfigService } from './services/app-config.service';
import { ErrorResponseNormalizerFilter } from './filters/error-response-normalizer.filter';
import { EmailService } from './services/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerProvider } from './providers/mailer.provider';
import { databaseProviders } from './providers/database.provider';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync(MailerProvider),
    JwtModule.registerAsync(JWTProvider),
  ],
  providers: [
    ConfigService,
    AppConfigService,
    EmailService,
    ErrorResponseNormalizerFilter,
    ...databaseProviders,
  ],
  exports: [
    AppConfigService,
    EmailService,
    ErrorResponseNormalizerFilter,
    ...databaseProviders,
  ],
})
export class GlobalModule {}
