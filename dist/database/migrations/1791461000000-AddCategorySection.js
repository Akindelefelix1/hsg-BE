export class AddCategorySection1791461000000 {
    async up(q) { await q.query(`ALTER TABLE "categories" ADD COLUMN "section" varchar NOT NULL DEFAULT 'fabric'`); }
    async down(q) { await q.query(`ALTER TABLE "categories" DROP COLUMN "section"`); }
}
//# sourceMappingURL=1791461000000-AddCategorySection.js.map