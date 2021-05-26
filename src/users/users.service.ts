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

  async create(user: any) {
    if ((await this.checkEmailExists(user.email)) == false) {
      return this.usersRepository.save(user);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          message: 'Email sudah digunakan',
          data: [],
          error: 'Email sudah digunakan',
        },
        HttpStatus.OK,
      );
    }
  }

  async findUser(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      email: email,
    });
    if (user) {
      return true;
    }
    return false;
  }
}
