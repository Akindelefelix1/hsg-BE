export class AddProductSaleUnit1791465000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products"
       ADD COLUMN "saleUnit" varchar NOT NULL DEFAULT 'trouser'`);
        await queryRunner.query(`UPDATE "products" AS product
       SET "saleUnit" = 'item'
       FROM "categories" AS category
       WHERE product."categoryId" = category.id
         AND category.section = 'accessories'`);
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "products" DROP COLUMN "saleUnit"');
    }
}
//# sourceMappingURL=1791465000000-AddProductSaleUnit.js.map