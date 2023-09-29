import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public c_name: string;

  @Column({ unique: true, comment: 'The slug of the category name' })
  public c_slug: string;

  @Column()
  public c_avatar: string;

  @Column()
  public c_banner: string;

  @Column()
  c_description: string;

  @Column()
  c_hot: number;

  @Column()
  c_status: number;
}

export default Category;
