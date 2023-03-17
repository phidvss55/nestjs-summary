import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
  UseInterceptors,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from 'src/authentication/interface/requestWithUser.interface';
import { Express } from 'express';
import ResponseData from 'src/utils/responseData';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  async findOne(@Param('id') id: string) {
    const data = await this.userService.getById(+id);
    return new ResponseData(200, data);
  }

  @Get('')
  @UseGuards(JwtAuthenticationGuard)
  async getAll() {
    const data = await this.userService.getAllList();
    return new ResponseData(200, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
    return this.userService.addAvatar(request.user.id, file.buffer, file.originalname);
  }

  @Delete('avatar')
  @UseGuards(JwtAuthenticationGuard)
  async deleteAvatar(@Req() request: RequestWithUser) {
    return this.userService.deleteAvatar(request.user.id);
  }
}
