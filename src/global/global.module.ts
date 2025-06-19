import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWTProvider } from './providers/jwt.provider';
import { AppConfigService } from './services/app-config.service';
import { ErrorResponseNormalizerFilter } from './filters/error-response-normalizer.filter';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync(JWTProvider),
  ],
  providers: [ConfigService, AppConfigService, ErrorResponseNormalizerFilter],
  exports: [AppConfigService, ErrorResponseNormalizerFilter],
})
export class GlobalModule {}
