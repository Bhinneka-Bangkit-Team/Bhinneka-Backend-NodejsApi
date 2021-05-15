import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import * as bcrypt from 'bcrypt';

@Controller('api')
export class AppController {
  constructor(private authService: AuthService) {}

  // This route does not need to authenticate users
  @Post('auth/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const payload = {
      username: username,
      password: hashedPassword,
    };

    return this.authService.login(payload);
  }

  // This route does not need to authenticate users
  @Post('auth/register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const payload = {
      username: username,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    };

    return this.authService.register(payload);
  }

  // This route need users to be authenticated
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
