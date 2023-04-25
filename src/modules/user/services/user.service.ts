import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import UserEntity from '../entities/user.entity';
import User from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userData);

    await this.userRepository.save(newUser);
    return newUser;
  }

  async getByEmail(email: string) {
    const user = this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  getById(id: number) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getAllList() {
    return this.userRepository.find();
  }

  async remove(id: number) {
    const res = await this.userRepository.delete(id);
    if (!res.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return 'User is deleted';
  }
}
