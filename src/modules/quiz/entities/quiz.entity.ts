import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Question from './question.entity';

@Entity('quizes')
class Quiz extends BaseEntity {
  @ApiProperty({ description: 'Primary ey as Quiz ID', example: 1 })
  @PrimaryGeneratedColumn({
    comment: 'The quiz unique identifier',
  })
  id: number;

  @ApiProperty({
    description: 'Title of the quiz',
    example: 'Sample Laravel quiz',
  })
  @Column({
    type: 'varchar',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the quiz',
    example: 'Lorem ipsum',
  })
  @Column({
    type: 'text',
  })
  description: string;

  @ApiProperty({
    description: 'Quiz active or inactive state',
    example: true,
  })
  @Column({
    type: 'boolean',
    default: 1,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'List of questions',
  })
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}

export default Quiz;
