import { HttpException, HttpStatus } from 'src/bootstrap';

export class UserEmailNotVerifiedException extends HttpException {
  constructor() {
    super('User not found.', HttpStatus.UNAUTHORIZED);
  }
}
