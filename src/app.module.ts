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
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'ricoferdian',
    //   password: '',
    //   database: 'db_bhinneka',
    //   entities: [],
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // socketPath:
      //   '/cloudsql/folkloric-ocean-308008:asia-southeast2:bhinneka-mysql8',
      host: '34.101.83.165',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'db_bhinneka',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, Chat]),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, GoogleapisService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
