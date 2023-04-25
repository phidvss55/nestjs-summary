import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Question from '../entities/question.entity';

@Injectable()
class QuestionRepository extends Repository<Question> {}

export default QuestionRepository;
