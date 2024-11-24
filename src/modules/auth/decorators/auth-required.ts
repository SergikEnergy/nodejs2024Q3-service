import { SetMetadata } from '@nestjs/common';

export const IS_AUTH_REQUIRED_KEY = 'isAuthRequired';
export const AuthRequired = () => SetMetadata(IS_AUTH_REQUIRED_KEY, true);
