import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWTProvider } from './providers/jwt.provider';
import { AppConfigService } from './services/app-config.service';
import { ErrorResponseNormalizerFilter } from './filters/error-response-normalizer.filter';
import { EmailService } from './services/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerProvider } from './providers/mailer.provider';

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
  ],
  exports: [AppConfigService, EmailService, ErrorResponseNormalizerFilter],
})
export class GlobalModule {}
