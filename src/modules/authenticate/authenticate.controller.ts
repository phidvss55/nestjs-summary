import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TokenType } from './entities/types';

@Controller('authenticate')
@ApiTags('Authentication')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post('register')
  @ApiOkResponse({ type: TokenType })
  async register(@Body() signUpDto: SignUpDto): Promise<TokenType> {
    return await this.authenticateService.signupUser(signUpDto);
  }

  @Post('login')
  @ApiOkResponse({ type: TokenType })
  async login(@Body() loginDto: LoginDto): Promise<TokenType> {
    return await this.authenticateService.loginUser(loginDto);
  }

  @Get('')
  async getUsers(@Query() query: any) {
    return await this.authenticateService.getAllUsers(query);
  }

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return await this.authenticateService.getDetailUser(id);
  }
}
