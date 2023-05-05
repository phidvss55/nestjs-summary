import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdRoleColumn1683195349404 implements MigrationInterface {
  name = 'AdRoleColumn1683195349404';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`role\` enum('admin', 'user', 'customer') NOT NULL DEFAULT 'CUSTOMER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
  }
}
