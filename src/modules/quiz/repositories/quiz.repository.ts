import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import Quiz from '../entities/quiz.entity';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {}
