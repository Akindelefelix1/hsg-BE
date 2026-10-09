import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductDetails1791464000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products"
       ADD COLUMN "composition" varchar,
       ADD COLUMN "width" varchar,
       ADD COLUMN "feel" varchar,
       ADD COLUMN "care" varchar`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products"
       DROP COLUMN "care",
       DROP COLUMN "feel",
       DROP COLUMN "width",
       DROP COLUMN "composition"`,
    );
  }
}
