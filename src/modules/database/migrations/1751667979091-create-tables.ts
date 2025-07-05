import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1751667979091 implements MigrationInterface {
    name = 'CreateTables1751667979091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brands" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "image" character varying(255) NOT NULL, CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"), CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" double precision NOT NULL, "stock" integer NOT NULL, "image" character varying NOT NULL, "brand_id" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "username" character varying(20) NOT NULL, "password" character varying(50) NOT NULL, "role" "public"."users_role_enum" NOT NULL, "customerId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_c6c520dfb9a4d6dd749e73b13d" UNIQUE ("customerId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "phone" character varying(15) NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "customerId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderdetails" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "productId" integer, "orderId" integer, CONSTRAINT "PK_cf4437dc89cc45584aba8c340cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jt_pro_cat" ("product_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_990cd9cef6d02060973f7978e19" PRIMARY KEY ("product_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f14e2f1d8793ce33c3ff28847e" ON "jt_pro_cat" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_37569b0b19a8839c8149e7d7a5" ON "jt_pro_cat" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderdetails" ADD CONSTRAINT "FK_92b1df5de126fce5ed82cacd8fc" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderdetails" ADD CONSTRAINT "FK_bc6f3e36a98f8792feaa2db9c02" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jt_pro_cat" ADD CONSTRAINT "FK_f14e2f1d8793ce33c3ff28847e4" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "jt_pro_cat" ADD CONSTRAINT "FK_37569b0b19a8839c8149e7d7a5a" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jt_pro_cat" DROP CONSTRAINT "FK_37569b0b19a8839c8149e7d7a5a"`);
        await queryRunner.query(`ALTER TABLE "jt_pro_cat" DROP CONSTRAINT "FK_f14e2f1d8793ce33c3ff28847e4"`);
        await queryRunner.query(`ALTER TABLE "orderdetails" DROP CONSTRAINT "FK_bc6f3e36a98f8792feaa2db9c02"`);
        await queryRunner.query(`ALTER TABLE "orderdetails" DROP CONSTRAINT "FK_92b1df5de126fce5ed82cacd8fc"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37569b0b19a8839c8149e7d7a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f14e2f1d8793ce33c3ff28847e"`);
        await queryRunner.query(`DROP TABLE "jt_pro_cat"`);
        await queryRunner.query(`DROP TABLE "orderdetails"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4fbc36ad745962e5c11001e1a8"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "brands"`);
    }

}
