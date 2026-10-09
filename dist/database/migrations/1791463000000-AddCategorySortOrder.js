export class AddCategorySortOrder1791463000000 {
    async up(q) { await q.query(`ALTER TABLE "categories" ADD COLUMN "sortOrder" integer NOT NULL DEFAULT 0`); await q.query(`WITH ranked AS (SELECT "id", ROW_NUMBER() OVER (PARTITION BY "section" ORDER BY "createdAt") - 1 AS position FROM "categories") UPDATE "categories" c SET "sortOrder" = ranked.position FROM ranked WHERE c."id" = ranked."id"`); }
    async down(q) { await q.query(`ALTER TABLE "categories" DROP COLUMN "sortOrder"`); }
}
//# sourceMappingURL=1791463000000-AddCategorySortOrder.js.map