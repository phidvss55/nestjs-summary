import { Query, Get, Controller, Body, DefaultValuePipe, Param, Post, ParseIntPipe } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto } from '../dto/createQuiz.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import Quiz from '../entities/quiz.entity';
import { ApiPaginationResponse } from '../../../common/decorator/api-pagination.response';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('list')
  async list(): Promise<Quiz[]> {
    return await this.quizService.getAllQuiz();
  }

  // @Get('')
  // @ApiPaginationResponse({ model: Quiz, description: 'List of quizzes' })
  // async getAllQuiz(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
  // ): Promise<Pagination<Quiz>> {
  //   const options: IPaginationOptions = {
  //     limit,
  //     page,
  //   };
  //   return await this.quizService.paginate(options);
  // }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a quiz by id', type: Quiz })
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizService.getQuizById(id);
  }

  @ApiCreatedResponse({ description: 'The quiz that got created', type: Quiz })
  @Post('create')
  // @UseGuards(RolesGuard)
  // @Roles('admin')
  async createQuiz(@Body() quizData: CreateQuizDto): Promise<Quiz> {
    return await this.quizService.createNewQuiz(quizData);
  }
}
