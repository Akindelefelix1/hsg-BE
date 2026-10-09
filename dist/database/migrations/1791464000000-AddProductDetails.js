export class AddProductDetails1791464000000 {
    async up(q) { await q.query(`ALTER TABLE "products" ADD COLUMN "composition" varchar, ADD COLUMN "width" varchar, ADD COLUMN "feel" varchar, ADD COLUMN "care" varchar`); }
    async down(q) { await q.query(`ALTER TABLE "products" DROP COLUMN "care", DROP COLUMN "feel", DROP COLUMN "width", DROP COLUMN "composition"`); }
}
//# sourceMappingURL=1791464000000-AddProductDetails.js.map