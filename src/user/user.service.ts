import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import UserEntity from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly filesService: FileService,
    private readonly dataSource: DataSource,
  ) {}

  async getByEmail(email: string) {
    const user = this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(userData: CreateUserDto) {
    const newUser = this.userRepository.create(userData);

    await this.userRepository.save(newUser);
    return newUser;
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

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const user = await this.getById(userId);
    if (user.avatar) {
      await this.userRepository.update(userId, {
        ...user,
        avatar: null,
      });
      await this.filesService.deletePublicFile(user.avatar.id);
    }
    const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
    await this.userRepository.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  async deleteAvatar(userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    const user = await this.getById(userId);
    const fileId = user.avatar?.id;
    if (fileId) {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        await queryRunner.manager.update(UserEntity, userId, {
          ...user,
          avatar: null,
        });
        await this.filesService.deletePublicFile(fileId);
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException();
      } finally {
        await queryRunner.release();
      }
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }
}
