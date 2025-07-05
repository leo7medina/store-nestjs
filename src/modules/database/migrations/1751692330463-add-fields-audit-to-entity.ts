import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldsAuditToEntity1751692330463 implements MigrationInterface {
    name = 'AddFieldsAuditToEntity1751692330463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "created_by" character varying`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updated_by" character varying`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "version" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "created_by" character varying`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updated_by" character varying`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "version" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "created_by" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_by" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "products" ADD "version" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "created_by" character varying`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updated_by" character varying`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "version" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "created_by" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "updated_by" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "version" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orderdetails" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orderdetails" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orderdetails" ADD "created_by" character varying`);
        await queryRunner.query(`ALTER TABLE "orderdetails" ADD "updated_by" character varying`);
        await queryRunner.query(`ALTER TABLE "orderdetails" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "orderdetails" ADD "version" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetails" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "orderdetails" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "orderdetails" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "orderdetails" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "orderdetails" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "orderdetails" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "created_at"`);
    }

}
