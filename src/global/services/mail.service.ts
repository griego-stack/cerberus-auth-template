import { Injectable } from 'src/bootstrap';
import { MailerService } from '@nestjs-modules/mailer';
import { AppConfigService } from './app-config.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly config: AppConfigService,
    private readonly mail: MailerService,
  ) {}

  async sendEmail(options: {
    email: string | string[];
    subject?: string;
    template?: string;
    context?: { [name: string]: any };
  }) {
    await this.mail.sendMail({
      from: `${this.config.serviceName} <${this.config.emailHostUser}>`,
      to: options.email,
      subject: options.subject,
      template: options.template,
      context: options.context,
    });
  }
}
