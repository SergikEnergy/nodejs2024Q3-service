import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CustomException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(
      message ?? 'Internal Server Error',
      status ?? HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
