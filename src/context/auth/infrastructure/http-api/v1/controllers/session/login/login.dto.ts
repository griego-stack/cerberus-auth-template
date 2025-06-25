import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class UserLoginDTO {
  @ValidateIf((o: UserLoginDTO) => !o.email)
  @IsNotEmpty({ message: 'Username is required if email is not provided.' })
  username?: string;

  @ValidateIf((o: UserLoginDTO) => !o.username)
  @IsEmail({}, { message: 'Email must be valid if provided.' })
  @IsNotEmpty({ message: 'Email is required if username is not provided.' })
  email?: string;

  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
