import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRefreshTokenUserTable1683192454552 implements MigrationInterface {
    name = 'UpdateRefreshTokenUserTable1683192454552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL`);
    }

}
