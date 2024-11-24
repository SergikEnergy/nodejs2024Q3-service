import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { IS_AUTH_EXCLUDED } from '../decorators/avoid-auth';
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const avoidAuth = this.reflector.getAllAndOverride<boolean>(
      IS_AUTH_EXCLUDED,
      [context.getHandler(), context.getClass()],
    );

    if (avoidAuth) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("User doesn't authorized!");
    }

    try {
      const payload = await this.jwtService.verifyAsync<{
        userId: string;
        login: string;
      }>(token, {
        secret: process.env.JWT_SECRET_KEY ?? 'secret',
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException("User doesn't authorized!");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
