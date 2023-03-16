import { PrimaryColumn, Column, Entity } from "typeorm";

@Entity()
export class File {
  @PrimaryColumn()
  public id: number

  @Column()
  public url: string;

  @Column()
  public key: string;
}

export default File;