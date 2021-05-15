import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async create(user: any): Promise<User> {
    if (!this.checkUsernameExists(user.username)) {
      return this.usersRepository.save(user);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: 'Username sudah digunakan',
        },
        HttpStatus.OK,
      );
    }
  }

  async findUser(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      username: username,
    });
    if (user) {
      return true;
    }
    return false;
  }
}
