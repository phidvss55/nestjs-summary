import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1683188418564 implements MigrationInterface {
  name = 'Test1683188418564';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`users\``);
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`refresh_token\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`refresh_token\``);
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`users\` (\`email\`)`);
  }
}
