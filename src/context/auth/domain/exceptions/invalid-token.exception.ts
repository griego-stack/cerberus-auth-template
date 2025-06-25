import { HttpException, HttpStatus } from 'src/bootstrap';

export class InvalidTokenException extends HttpException {
  constructor() {
    super('The provided token is invalid.', HttpStatus.UNAUTHORIZED);
  }
}
