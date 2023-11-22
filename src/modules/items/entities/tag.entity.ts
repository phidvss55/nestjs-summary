import { AbstractEntity } from 'src/database/database.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Tag extends AbstractEntity<Tag> {
  @Column()
  content: string;
}
