import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
class PostEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Id',
    example: 1,
  })
  public id?: number;

  @Column()
  @ApiProperty({
    description: 'Title',
    example: 'title 1: ...',
  })
  public title: string;

  @Column()
  @ApiProperty({
    description: 'Description',
    example: 'lorem ...',
  })
  public content: string;
}

export default PostEntity;
