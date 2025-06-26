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

  get refreshTokenAlive(): { time: number; text: string } {
    return { time: 30 * 24 * 60 * 60 * 1000, text: '30 days' };
  }

  get accessTokenAlive(): { time: number; text: string } {
    return { time: 5 * 60 * 1000, text: '5 minutes' };
  }

  get requestChangePasswordAlive(): { time: number; text: string } {
    return { time: 30 * 60 * 1000, text: '30 minutes' };
  }

  get emailProviderId(): number {
    return 1;
  }

  get googleProviderId(): number {
    return 2;
  }

  get githubProviderId(): number {
    return 3;
  }

  get defaultRoleId(): number {
    return 1; // USER
  }

  // Secrets

  get jwt_secret_key(): string {
    return this.config.get<string>('JWT_SECRET_KEY') || 'default_secret_key';
  }

  get cookie_secret(): string {
    return this.config.get<string>('COOKIE_SECRET') || 'default_cookie_secret';
  }

  // Client Configuration

  get clients_url(): string[] {
    return [this.config.get<string>('CLIENT_1_URL') || 'http://localhost:3000'];
  }

  // Session Configuration

  get maxAttemps(): number {
    return 5;
  }

  get windowAttemptsWindowTime(): number {
    return 15 * 60 * 1000;
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

  // Social

  get googleClientID(): string {
    return this.config.get<string>('GOOGLE_CLIENT_ID') || '';
  }

  get googleClientSecret(): string {
    return this.config.get<string>('GOOGLE_CLIENT_SECRET') || '';
  }

  get githubClientID(): string {
    return this.config.get<string>('GITHUB_CLIENT_ID') || '';
  }

  get githubClientSecret(): string {
    return this.config.get<string>('GITHUB_CLIENT_SECRET') || '';
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
