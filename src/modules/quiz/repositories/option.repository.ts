import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Quiz from '../entities/quiz.entity';

@Injectable()
export class QuizRepository extends Repository<Quiz> {}
