import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import { MyLoggerDev } from '@src/logger/my-logger.dev';

@Controller('user')
export class UserController {
  @Inject(MyLoggerDev) private readonly logger: MyLoggerDev;

  constructor(private readonly userService: UserService) {}

  @Post('logger')
  loggerTest(@Body() body: { message: string }) {
    console.log('Logger test called::', body);
    this.logger.log(body.message);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('upload/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads/avatar',
      storage: 'storage',
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      },
      fileFilter: (req, file, cb) => {
        // extName
        const extName = path.extname(file.originalname);
        if (['.jpg', '.png', '.gif'].includes(extName)) {
          cb(null, true);
        }
        return cb(
          new BadRequestException('Only image files are allowed!'),
          false,
        );
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(`File uploaded: ${file.path}`);
    return file.path;
  }
}
