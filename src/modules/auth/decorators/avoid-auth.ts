import { SetMetadata } from '@nestjs/common';

export const IS_AUTH_EXCLUDED = 'isAuthExcluded';
export const AvoidAuth = () => SetMetadata(IS_AUTH_EXCLUDED, true);
