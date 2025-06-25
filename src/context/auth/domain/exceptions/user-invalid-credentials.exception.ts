import { HttpException, HttpStatus } from 'src/bootstrap';

export class UserInvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid credentials.', HttpStatus.FORBIDDEN);
  }
}
