import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ login, password }: LoginDto) {
    const foundUser = await this.usersService.findByName(login);
    if (!foundUser) {
      throw new UnauthorizedException(`User with login:${login} wasn't found!`);
    }

    const isPasswordValid = await this.comparePasswords(
      password,
      foundUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Incorrect user's password!");
    }

    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.generateAccessToken(foundUser.id, foundUser.login),
        this.generateRefreshToken(foundUser.id, foundUser.login),
      ]);

      return { id: foundUser.id, accessToken, refreshToken };
    } catch {
      throw new InternalServerErrorException(
        'Failed login - try a little bit later!',
      );
    }
  }

  async signUp({ login, password }: SignUpDto) {
    const foundUser = await this.usersService.findByName(login);
    if (foundUser) {
      throw new BadRequestException(`User with login:${login} already exist!`);
    }

    return await this.usersService.createUser({ login, password });
  }

  async refresh({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) {
      throw new UnauthorizedException('RefreshToken should be provided!');
    }

    try {
      const { userId, login } = await this.jwtService.verifyAsync<{
        userId: string;
        login: string;
      }>(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY ?? 'secret',
      });

      const [accessToken, freshToken] = await Promise.all([
        this.generateAccessToken(userId, login),
        this.generateRefreshToken(userId, login),
      ]);

      return { id: userId, accessToken, refreshToken: freshToken };
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('For current user token is expired!');
      }
      throw new ForbiddenException(
        'Something went wrong! Try to send request a little bit later!',
      );
    }
  }

  private async comparePasswords(
    rawPassword: string,
    hashedOldPassword: string,
  ) {
    try {
      return await compare(rawPassword, hashedOldPassword);
    } catch {
      return false;
    }
  }

  private async generateAccessToken(userId: string, login: string) {
    return await this.jwtService.signAsync(
      { userId, login },
      {
        expiresIn: process.env.TOKEN_EXPIRE_TIME ?? '1h',
        secret: process.env.JWT_SECRET_KEY ?? 'secret',
      },
    );
  }

  private async generateRefreshToken(userId: string, login: string) {
    return await this.jwtService.signAsync(
      { userId, login },
      {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME ?? '2h',
        secret: process.env.JWT_SECRET_REFRESH_KEY ?? 'secret',
      },
    );
  }
}
