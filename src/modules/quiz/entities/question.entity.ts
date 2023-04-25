import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Quiz from './quiz.entity';
import { ApiProperty } from '@nestjs/swagger';
import Option from './option.entity';

@Entity('questions')
class Question extends BaseEntity {
  @ApiProperty({
    description: 'The primary ID of question.',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The actual question',
    example: 'What is the question?',
  })
  @Column({
    type: 'varchar',
  })
  question: string;

  @ApiProperty({
    description: 'Quiz of the question',
    type: () => Quiz,
  })
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @ApiProperty({
    description: 'Options of the question',
  })
  @OneToMany(() => Option, (option) => option.question)
  options: Option[];
}

export default Question;
