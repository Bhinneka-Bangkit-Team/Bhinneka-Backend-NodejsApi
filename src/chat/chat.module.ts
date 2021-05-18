import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatService],
  exports: [ChatService, TypeOrmModule],
  controllers: [],
})
export class ChatModule {}
