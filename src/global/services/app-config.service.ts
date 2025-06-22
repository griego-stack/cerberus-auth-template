import { ConfigService } from '@nestjs/config';
import { Injectable } from 'src/bootstrap';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  //   App Configuration

  get serviceName(): string {
    return 'Cerbeus Auth Template';
  }

  get globalPrefix(): string {
    return 'api';
  }

  get port(): number {
    return this.config.get<number>('PORT') || 8000;
  }

  get jwt_expiresIn(): string | number {
    return '1d';
  }

  get confirmationTokenAlive(): { time: number; text: string } {
    return { time: 24 * 60 * 60 * 1000, text: '24 hours' };
  }

  // Secrets

  get jwt_secret_key(): string {
    return this.config.get<string>('JWT_SECRET_KEY') || 'default_secret_key';
  }

  // Client Configuration

  get clients_url(): string[] {
    return [this.config.get<string>('CLIENT_1_URL') || 'http://localhost:3000'];
  }

  // Email Configuration

  get emailHost(): string {
    return this.config.get<string>('EMAIL_HOST') || '';
  }

  get emailPort(): number {
    return this.config.get<number>('EMAIL_PORT') || 465;
  }

  get emailSecure(): boolean {
    return this.config.get<boolean>('EMAIL_SECURE') || true;
  }

  get emailHostUser(): string {
    return this.config.get<string>('EMAIL_HOST_USER') || '';
  }

  get emailHostPassword(): string {
    return this.config.get<string>('EMAIL_HOST_PASSWORD') || '';
  }

  // Database Configuration

  get mainDatabase(): {
    type: 'mysql';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  } {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: this.config.get<string>('MAIN_DATABASE_NAME') || 'cerbeus',
      username: this.config.get<string>('MAIN_DATABASE_USER') || 'root',
      password: this.config.get<string>('MAIN_DATABASE_PASSWORD') || 'password',
    };
  }
}
