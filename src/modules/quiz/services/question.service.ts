import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from '../dto/createQuestion.dto';
import Quiz from '../entities/quiz.entity';
import Question from '../entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findQuestionById(id: number): Promise<Question> {
    return await this.questionRepository.findOne({
      where: { id },
      relations: ['quiz', 'options'],
    });
  }

  async createQuestion(question: CreateQuestionDto, quiz: Quiz): Promise<Question> {
    const newQuestion = await this.questionRepository.save({
      question: question.question,
    });

    quiz.questions = [...quiz.questions, newQuestion];
    await quiz.save();

    return newQuestion;
  }
}
