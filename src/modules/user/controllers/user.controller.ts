import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import ResponseData from 'src/utils/responseData';
import User from '../entities/user.entity';
import { SETTINGS } from 'src/utils/helper';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async doUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE)
    userRegister: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(userRegister);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.getById(+id);
    return new ResponseData(200, data);
  }

  @Get('')
  async getAll() {
    const data = await this.userService.getAllList();
    return new ResponseData(200, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
