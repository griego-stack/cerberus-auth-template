import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestChangePasswordDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
