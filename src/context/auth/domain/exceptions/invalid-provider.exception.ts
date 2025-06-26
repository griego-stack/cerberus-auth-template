import { HttpException, HttpStatus } from 'src/bootstrap';

export class InvalidUserProviderException extends HttpException {
  constructor() {
    super('Invalid user provider.', HttpStatus.BAD_REQUEST);
  }
}
