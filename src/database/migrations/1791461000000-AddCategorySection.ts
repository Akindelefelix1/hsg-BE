import { MigrationInterface, QueryRunner } from 'typeorm';
export class AddCategorySection1791461000000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> { await q.query(`ALTER TABLE "categories" ADD COLUMN "section" varchar NOT NULL DEFAULT 'fabric'`); }
  async down(q: QueryRunner): Promise<void> { await q.query(`ALTER TABLE "categories" DROP COLUMN "section"`); }
}
