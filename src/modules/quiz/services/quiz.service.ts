import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from '../dto/createQuiz.dto';
import Quiz from '../entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async getAllQuiz(): Promise<Quiz[]> {
    return await this.quizRepository.createQueryBuilder('q').leftJoinAndSelect('q.questions', 'qt').getMany();
  }

  // async paginate(options: Ipaginationoption): Promise<Pagination<Quiz>> {
  //   const qb = this.quizRepository.createQueryBuilder('q');
  //   qb.orderBy('q.id', 'DESC');

  //   return paginate<Quiz>(qb, options);
  // }

  async getQuizById(id: number): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
  }

  async createNewQuiz(quiz: CreateQuizDto) {
    return await this.quizRepository.save(quiz);
  }
}
