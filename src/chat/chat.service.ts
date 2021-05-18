import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async getUserChat(user_id: number): Promise<any> {
    const data = await this.chatRepository.find({ user_id: user_id });
    return {
      statusCode: HttpStatus.OK,
      message: 'Pengambilan data chat berhasil !',
      data: data,
      error: '',
    };
  }

  async storeUserChat(chat: any): Promise<any> {
    const data = await this.chatRepository.save(chat);
    return {
      statusCode: HttpStatus.OK,
      message: 'Penyimpanan data chat berhasil !',
      data: data,
      error: '',
    };
  }
}
