import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PersonInput } from '../../../common/schema/graphql';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('user-movie-rec')
  async userGenreMovieCountRec(@Query('userName') userName: string, @Query('limit') limit = 10) {
    return await this.userService.userGenreMovieCountRec(userName, limit);
  }
}
