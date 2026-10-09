import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveAsoOkeToFabric1791468000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "categories" AS category
       SET "section" = 'fabric',
           "sortOrder" = (
             SELECT COALESCE(MAX(target."sortOrder"), -1) + 1
             FROM "categories" AS target
             WHERE target."section" = 'fabric'
               AND target."deletedAt" IS NULL
           )
       WHERE category."slug" = 'aso-oke'
         AND category."section" = 'accessories'`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "categories" AS category
       SET "section" = 'accessories',
           "sortOrder" = (
             SELECT COALESCE(MAX(target."sortOrder"), -1) + 1
             FROM "categories" AS target
             WHERE target."section" = 'accessories'
               AND target."deletedAt" IS NULL
           )
       WHERE category."slug" = 'aso-oke'
         AND category."section" = 'fabric'`,
    );
  }
}
