import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { AppConfigService } from '../services/app-config.service';

export const JWTProvider: JwtModuleAsyncOptions = {
  global: true,
  inject: [AppConfigService],
  useFactory: (app: AppConfigService) => ({
    secret: app.jwt_secret_key,
    signOptions: { expiresIn: app.jwt_expiresIn },
  }),
};
