import { HttpException, HttpStatus } from 'src/bootstrap';

export class UserEmailAlreadyVerifiedException extends HttpException {
  constructor() {
    super('Email address is already verified.', HttpStatus.BAD_REQUEST);
  }
}
