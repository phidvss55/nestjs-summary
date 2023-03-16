import { Column, JoinTable, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';
import User from '../../user/entities/user.entity';
import Category from '../../categories/entities/category.entity';

@Entity()
// @Index(['postId', 'authorId'])
class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public category?: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];

  @Column('text', { array: true, nullable: true })
  public paragraphs?: string[];
}

export default Post;
