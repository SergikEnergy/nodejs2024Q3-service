import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp new user with validation if user exist' })
  @ApiBody({
    required: true,
    schema: { example: { login: 'user', password: 'test_pass' } },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User already exist!',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create new user',
    example: {
      id: 'uuid format id',
      login: 'testUser',
      version: 1,
      createdAt: 1023443344,
      updatedAt: 1023443344,
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() signUpInfo: SignUpDto) {
    return await this.authService.signUp(signUpInfo);
  }

  @ApiOperation({ summary: 'Login user with login and password.' })
  @ApiBody({
    required: true,
    schema: { example: { login: 'user', password: 'test_pass' } },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not found!',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User password is not valid!',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed login - try a little bit later!',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get token data in JWT format',
    example: {
      id: 'uuid format string',
      accessToken: 'jwt token format',
      refreshToken: 'jwt token format',
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginInfo: LoginDto) {
    return await this.authService.login(loginInfo);
  }

  @ApiOperation({ summary: 'Get refresh token.' })
  @ApiBody({
    required: true,
    schema: { example: { refreshToken: '9jfhufjkdd.ckvucncbh.ldpflodkfd' } },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'For current user token is expired!',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Something went wrong! Try to send request a little bit later!',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 'uuid format string',
      accessToken: 'jwt token format',
      refreshToken: 'jwt token format',
    },
    description: 'Get tokens data in JWT format',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() refreshInfo: RefreshTokenDto) {
    return await this.authService.refresh(refreshInfo);
  }
}
