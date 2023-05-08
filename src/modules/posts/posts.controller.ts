import { ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import PostEntity from './entity/post.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesDecorator } from '../../common/decorators/roles.decorator';
import { Roles } from '../../common/constants/roles.constants';

@ApiTags('Posts')
@Controller('posts')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(RolesGuard)
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @ApiCreatedResponse({ description: 'The post that got created', type: PostEntity })
  @UseGuards(RolesGuard)
  @RolesDecorator(Roles.ADMIN)
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
