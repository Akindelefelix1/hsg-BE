var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsOptional, IsString } from "class-validator";
export class UpdateSiteSettingsDto {
    announcement;
    heroEyebrow;
    heroTitle;
    heroAccent;
    heroDescription;
    primaryLabel;
    primaryHref;
    secondaryLabel;
    secondaryHref;
    trustOne;
    trustTwo;
    imageNote;
    heroImageKey;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "announcement", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "heroEyebrow", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "heroTitle", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "heroAccent", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "heroDescription", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "primaryLabel", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "primaryHref", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "secondaryLabel", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "secondaryHref", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "trustOne", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "trustTwo", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "imageNote", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "heroImageKey", void 0);
//# sourceMappingURL=site-settings.dto.js.map