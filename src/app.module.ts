import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { GoogleapisService } from './googleapis/googleapis.service';
import { UsersService } from './users/users.service';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/chat.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Chat]),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, GoogleapisService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
