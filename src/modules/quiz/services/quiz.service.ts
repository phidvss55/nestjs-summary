import { OnEvent } from '@nestjs/event-emitter';
import { Pagination, paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from '../dto/createQuiz.dto';
import Quiz from '../entities/quiz.entity';
import { Repository } from 'typeorm';
import { events } from 'src/common/constant/event.constant';
import { ResponseAddEvent } from '../events/responseAdd.event';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async getAllQuiz(): Promise<Quiz[]> {
    return await this.quizRepository.createQueryBuilder('q').leftJoinAndSelect('q.questions', 'qt').getMany();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Quiz>> {
    const qb = this.quizRepository.createQueryBuilder('q').orderBy('q.id', 'DESC');
    return paginate<Quiz>(qb, options);
  }

  async getQuizById(id: number): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
  }

  async createNewQuiz(quiz: CreateQuizDto) {
    return await this.quizRepository.save(quiz);
  }

  @OnEvent(events.RESPONSE_SUBMITTED)
  checkQuizCompeleted(payload: ResponseAddEvent) {
    console.log('checkQuizCompeleted', payload);
  }
}
