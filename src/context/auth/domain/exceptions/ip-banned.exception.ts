import { HttpException, HttpStatus } from 'src/bootstrap';

export class IPBlockedException extends HttpException {
  constructor() {
    super(
      'Too many failed login attempts. This IP is temporarily blocked.',
      HttpStatus.FORBIDDEN,
    );
  }
}
