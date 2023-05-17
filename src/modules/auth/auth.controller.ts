import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    // const transaction: Transaction = req.transaction

    const user = await this.authService.create(
      // transaction,
      createUserDto,
    );

    console.log(user);

    return user;
  }
}
