import { HttpException, HttpStatus } from 'src/bootstrap';

export class TokenRequiredException extends HttpException {
  constructor() {
    super('Token required.', HttpStatus.UNAUTHORIZED);
  }
}
