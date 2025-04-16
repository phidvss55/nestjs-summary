import { Module } from '@nestjs/common';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Quiz from './entities/quiz.entity';
import Question from './entities/question.entity';
import Option from './entities/option.entity';
import { QuestionController } from './controllers/question.controller';
import { QuestionService } from './services/question.service';
import { OptionService } from './services/option.service';
import { OptionController } from './controllers/option.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Option]), UserModule],
  controllers: [QuizController, QuestionController, OptionController],
  providers: [QuizService, QuestionService, OptionService],
  exports: [QuizService, QuestionService, OptionService],
})
export class QuizModule {}
