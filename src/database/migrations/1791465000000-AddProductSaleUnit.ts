import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductSaleUnit1791465000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products"
       ADD COLUMN "saleUnit" varchar NOT NULL DEFAULT 'trouser'`,
    );
    await queryRunner.query(
      `UPDATE "products" AS product
       SET "saleUnit" = 'item'
       FROM "categories" AS category
       WHERE product."categoryId" = category.id
         AND category.section = 'accessories'`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "products" DROP COLUMN "saleUnit"');
  }
}
