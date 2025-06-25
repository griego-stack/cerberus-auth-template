import { HttpException, HttpStatus } from 'src/bootstrap';

export class SessionExpiredException extends HttpException {
  constructor() {
    super('Session has expired. Please log in again.', HttpStatus.UNAUTHORIZED);
  }
}
