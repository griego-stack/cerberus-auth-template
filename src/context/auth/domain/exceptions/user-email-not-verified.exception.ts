import { HttpException, HttpStatus } from 'src/bootstrap';

export class UserEmailNotVerifiedException extends HttpException {
  constructor() {
    super('Email address has not been verified.', HttpStatus.UNAUTHORIZED);
  }
}
