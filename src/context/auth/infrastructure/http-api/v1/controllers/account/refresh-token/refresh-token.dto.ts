import { IsEmail, IsNotEmpty } from 'class-validator';

export class RefreshConfirmationTokenDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
