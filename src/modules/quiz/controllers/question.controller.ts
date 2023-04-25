import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from '../dto/createQuestion.dto';
import { QuestionService } from '../services/question.service';
import Question from '../entities/question.entity';
import { QuizService } from '../services/quiz.service';

@ApiTags('Question')
@Controller('questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private quizService: QuizService
  ) {}

  @Post('create')
  @ApiCreatedResponse({
    description: 'Question added to a quiz',
    type: Question,
  })
  async saveQuestion(@Body() question: CreateQuestionDto) {
    const quiz = await this.quizService.getQuizById(question.quizId);
    return await this.questionService.createQuestion(question, quiz);
  }
}
