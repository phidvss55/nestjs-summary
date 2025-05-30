import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { ApiTags } from '@nestjs/swagger';
import FindOneParams from '../utils/findOneParams';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import ResponseData from '../utils/responseData';

@Controller('post')
@ApiTags('Post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postService.create(post, req.user);
  }

  @Get()
  async findAll() {
    const data = await this.postService.findAll();
    return new ResponseData(200, data);
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParams) {
    const data = await this.postService.findOne(+id);
    return new ResponseData(200, data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const data = this.postService.update(+id, updatePostDto);
    return new ResponseData(200, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postService.remove(+id);
  }
}
