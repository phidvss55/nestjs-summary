import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(private dataSource: DataSource) {}

  // async createMany(comment: Comment[]) {
  // const queryRunner = this.dataSource.createQueryRunner();

  // await queryRunner.connect();
  // await queryRunner.startTransaction();
  // try {
  //   await queryRunner.manager.save(comment[0]);
  //   await queryRunner.manager.save(comment[1]);

  //   await queryRunner.commitTransaction();
  // } catch (err) {
  //   await queryRunner.rollbackTransaction();
  // } finally {
  //   await queryRunner.release();
  // }
  // }
}
