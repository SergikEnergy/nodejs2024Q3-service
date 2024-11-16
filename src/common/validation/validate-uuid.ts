import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ParseUUIDPipe,
  ParseUUIDPipeOptions,
} from '@nestjs/common';

@Injectable()
export class ValidateUUIDPipe extends ParseUUIDPipe {
  constructor(options?: ParseUUIDPipeOptions) {
    super(options);
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    try {
      return await super.transform(value, metadata);
    } catch {
      throw new BadRequestException(
        `Validation Error! Provided id:${value} is not UUID version:${this.options.version}`,
      );
    }
  }
}
