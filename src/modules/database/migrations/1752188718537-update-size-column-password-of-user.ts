import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSizeColumnPasswordOfUser1752188718537 implements MigrationInterface {
    name = 'UpdateSizeColumnPasswordOfUser1752188718537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`-- ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        // await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(50)`);
    }

}
