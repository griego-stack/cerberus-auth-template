import { HttpException, HttpStatus } from 'src/bootstrap';

export class UserInactiveException extends HttpException {
  constructor() {
    super('User account is inactive.', HttpStatus.FORBIDDEN);
  }
}
