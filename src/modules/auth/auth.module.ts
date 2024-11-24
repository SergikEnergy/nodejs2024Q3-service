import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AuthGuard } from './guards/auth-guard';

dotenv.config();

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersService,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY ?? 'simpleSecretKey',
      global: true,
      signOptions: { algorithm: 'ES256' },
    }),
  ],
})
export class AuthModule {}
