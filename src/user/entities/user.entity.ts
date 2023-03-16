import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { Exclude } from 'class-transformer';
import Address from './address.entity';
import Post from "../../post/entities/post.entity";
import File from "src/file/file.entity";

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  @JoinColumn()
  @OneToOne(
    () => File, 
    {
      eager: true, 
      nullable: true
    }
  )
  public avatar?: File

  @Column({
    nullable: true
  })
  @Exclude()
  public currentHashedRefreshToken?: string;
}

export default User;
