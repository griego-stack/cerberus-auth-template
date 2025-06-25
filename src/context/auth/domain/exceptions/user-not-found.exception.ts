import { HttpException, HttpStatus } from 'src/bootstrap';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found.', HttpStatus.NOT_FOUND);
  }
}
