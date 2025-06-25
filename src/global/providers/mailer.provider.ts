import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppConfigService } from '../services/app-config.service';
import * as path from 'path';

export const MailerProvider: MailerAsyncOptions = {
  inject: [AppConfigService],
  useFactory: (app: AppConfigService) => ({
    transport: {
      host: app.emailHost,
      port: app.emailPort,
      secure: app.emailSecure,
      auth: {
        user: app.emailHostUser,
        pass: app.emailHostPassword,
      },
    },
    defaults: {
      from: `Soporte <${app.emailHostUser}>`,
    },
    template: {
      dir: path.join(__dirname, '/../../../../src/templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
};
