import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Res,
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
import { Param } from '@nestjs/common';
import { Header } from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { nanoid } from 'nanoid';
import * as fs from 'fs';

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
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const payload = {
      email: email,
      password: password,
    };

    return this.authService.login(payload);
  }

  // This route does not need to authenticate users
  @Post('auth/register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const payload = {
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    };

    return this.authService.register(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('google/tts')
  async textspeech(
    @Request() req,
    @Body('text') text: string,
    @Body('lang') lang: string,
  ) {
    const uniqueid = nanoid();
    const isSuccess = await this.googleService.googletts(text, lang, uniqueid);
    if (isSuccess) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Pengenalan berhasil !',
        data: `https://storage.googleapis.com/bhinneka-backend-bucket/audio_transcribe/tts${uniqueid}.mp3`,
        error: '',
      };
      // return {
      //   statusCode: HttpStatus.OK,
      //   message: 'Pengenalan berhasil !',
      //   data: `http://${req.headers.host}/api/audio/get/tts${req.user.id}.mp3`,
      //   error: '',
      // };
    }
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Pengenalan gagal !',
      data: null,
      error: '',
    };
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

  @Get('audio/get/:filename')
  @Header('Content-Type', 'application/pdf')
  async getFile(@Res() res: Response, @Param('filename') filename: string) {
    console.log('filename', filename);
    const filePath = `audio_transcribe/${filename}`;
    const stat = fs.statSync(filePath);
    console.log('filePath', filePath);

    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size,
    });

    const readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('chat/store')
  async storeChat(
    @Request() req,
    @Body('text') text: string,
    @Body('lang') lang: string,
    @Body('isSpeaker') isSpeaker: number,
  ) {
    const payload = {
      userId: req.user.id,
      isSpeaker: isSpeaker,
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
