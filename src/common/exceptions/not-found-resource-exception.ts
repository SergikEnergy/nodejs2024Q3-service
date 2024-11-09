import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class NotFoundResourceException extends HttpException {
  constructor(name: string, id: string) {
    super(
      `Error ocurred! Cannot find ${name} with id:${id} in database!`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
