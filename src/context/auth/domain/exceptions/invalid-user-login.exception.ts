import { HttpException, HttpStatus } from 'src/bootstrap';

export class InvalidUserLoginException extends HttpException {
  constructor() {
    super('Invalid user login.', HttpStatus.BAD_REQUEST);
  }
}
