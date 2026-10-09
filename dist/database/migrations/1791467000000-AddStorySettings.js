export class AddStorySettings1791467000000 {
    name = "AddStorySettings1791467000000";
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "site_settings" ADD "story" jsonb');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "site_settings" DROP COLUMN "story"');
    }
}
//# sourceMappingURL=1791467000000-AddStorySettings.js.map