import { Query, Get, Controller, Body, DefaultValuePipe, Param, Post, ParseIntPipe, UseGuards } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto } from '../dto/createQuiz.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import Quiz from '../entities/quiz.entity';
import { ApiPaginationResponse } from '../../../common/decorator/api-pagination.response';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/jwtAuth.guard';

@ApiTags('Quiz')
@Controller('quiz')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('list')
  async list(): Promise<Quiz[]> {
    return await this.quizService.getAllQuiz();
  }

  @Get('')
  @ApiPaginationResponse({ model: Quiz, description: 'List of quizzes' })
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
  ): Promise<Pagination<Quiz>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.quizService.paginate(options);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a quiz by id', type: Quiz })
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizService.getQuizById(id);
  }

  @ApiCreatedResponse({ description: 'The quiz that got created', type: Quiz })
  @Post('create')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createQuiz(@Body() quizData: CreateQuizDto): Promise<Quiz> {
    return await this.quizService.createNewQuiz(quizData);
  }
}
