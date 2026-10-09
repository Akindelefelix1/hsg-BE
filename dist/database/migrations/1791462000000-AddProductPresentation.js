export class AddProductPresentation1791462000000 {
    async up(q) { await q.query(`ALTER TABLE "products" ADD COLUMN "color" varchar NOT NULL DEFAULT '#183b8f', ADD COLUMN "texture" varchar NOT NULL DEFAULT 'woven', ADD COLUMN "badge" varchar`); }
    async down(q) { await q.query(`ALTER TABLE "products" DROP COLUMN "badge", DROP COLUMN "texture", DROP COLUMN "color"`); }
}
//# sourceMappingURL=1791462000000-AddProductPresentation.js.map