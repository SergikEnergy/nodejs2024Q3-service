import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserModule } from '../user/user.module';
import { AuthGuard } from './guards/auth-guard';
import { APP_GUARD } from '@nestjs/core';

dotenv.config();

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
