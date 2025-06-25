import { HttpException, HttpStatus } from 'src/bootstrap';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('User already exists.', HttpStatus.CONFLICT);
  }
}
