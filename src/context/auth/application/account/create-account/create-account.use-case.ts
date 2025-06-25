import { nanoid } from 'nanoid';
import * as argon2 from 'argon2';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from 'src/bootstrap';
import {
  UserConfirmationTokenEntity,
  UserConfirmationTokenRepository,
  UserEntity,
  UserProfileEntity,
  UserProfileRepository,
  UserRepository,
} from 'src/context/auth/domain';
import { UserAlreadyExistsException } from 'src/context/auth/domain/exceptions/user-already-exists.exception';
import { AppConfigService } from 'src/global/services/app-config.service';
import { EmailService } from 'src/global/services/mail.service';
import { CreateUserAccountDTO } from './create-account.dto';

@Injectable()
export class CreateUserAccountUseCase {
  constructor(
    private readonly config: AppConfigService,
    private readonly confirmationToken: UserConfirmationTokenRepository,
    private readonly mailer: EmailService,
    private readonly profile: UserProfileRepository,
    private readonly user: UserRepository,
  ) {}

  async execute(data: CreateUserAccountDTO) {
    if (!data.metadata.redirectURL)
      throw new BadRequestException('Redirect URL is required.');

    const existingUser = await this.user.findByEmail(data.email);

    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const token = this._createToken();
    const expirationToken = new Date(
      Date.now() + this.config.confirmationTokenAlive.time,
    );
    const confirmationUrl = `${data.metadata.redirectURL}?token=${token}`;

    try {
      const newUser = UserEntity.create({
        username: data.username,
        email: data.email,
        password: await this._hashPassword(data.password),
        providerId: 1, // EMAIL
        roleId: 1, // USER
      });

      const newUserCreated = await this.user.create(newUser);

      const newUserProfile = UserProfileEntity.create({
        firstname: data.firstname,
        lastname: data.lastname,
        user_id: newUserCreated.id,
      });

      await this.profile.create(newUserProfile);

      const newConfirmationToken = UserConfirmationTokenEntity.create({
        userId: newUserCreated.id,
        token: token,
        expiresAt: expirationToken,
      });

      await this.confirmationToken.create(newConfirmationToken);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the user.',
      );
    }

    this.mailer
      .sendEmail({
        email: data.email,
        subject: `Confirm your account on ${this.config.serviceName}`,
        template: 'account-confirmation',
        context: {
          userName: data.username,
          serviceName: this.config.serviceName,
          confirmationUrl,
          expirationTime: this.config.confirmationTokenAlive.text,
        },
      })
      .catch((error) => {
        // Should be logged
        console.error('Error sending confirmation email:', error);
      });
  }

  _createToken() {
    return nanoid(32);
  }

  _hashPassword(password: string) {
    return argon2.hash(password);
  }
}
