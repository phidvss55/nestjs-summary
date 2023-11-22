import { AbstractEntity } from 'src/database/database.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Listing extends AbstractEntity<Listing> {
  @Column()
  description: string;

  @Column()
  rating: number;
}
