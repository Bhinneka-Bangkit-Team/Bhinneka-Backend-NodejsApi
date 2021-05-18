import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import * as bcrypt from 'bcrypt';
import { GoogleapisService } from './googleapis/googleapis.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UploadedFile } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { ChatService } from './chat/chat.service';

@Controller('api')
export class AppController {
  constructor(
    private authService: AuthService,
    private googleService: GoogleapisService,
    private usersService: UsersService,
    private chatService: ChatService,
  ) {}

  @Post('auth/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const payload = {
      username: username,
      password: password,
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

  @UseGuards(JwtAuthGuard)
  @Post('google/tts')
  async textspeech(@Body('text') text: string, @Body('lang') lang: string) {
    return this.googleService.googletts(text, lang);
  }

  @UseGuards(JwtAuthGuard)
  @Post('google/stt')
  @UseInterceptors(FileInterceptor('file'))
  async speechtext(
    @UploadedFile() file: Express.Multer.File,
    @Body('lang') lang: string,
  ) {
    return this.googleService.googlestt(file.buffer, lang);
  }

  @UseGuards(JwtAuthGuard)
  @Post('chat/store')
  async storeChat(
    @Request() req,
    @Body('text') text: string,
    @Body('lang') lang: string,
  ) {
    const payload = {
      user_id: req.user.id,
      text: text,
      lang: lang,
    };
    return this.chatService.storeUserChat(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('chat/get')
  async getChat(@Request() req) {
    return this.chatService.getUserChat(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }
}
