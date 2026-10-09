var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsHexColor, IsIn, IsInt, IsNumber, IsOptional, IsString, IsUrl, IsUUID, Min, ValidateNested } from 'class-validator';
export class CreateCategoryDto {
    name;
    slug;
    description;
    section;
    sortOrder;
    active;
}
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "slug", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsIn(['fabric', 'accessories']),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "section", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateCategoryDto.prototype, "sortOrder", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateCategoryDto.prototype, "active", void 0);
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
}
export class ProductMediaDto {
    key;
    url;
    name;
    type;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], ProductMediaDto.prototype, "key", void 0);
__decorate([
    IsUrl({ require_tld: false }),
    __metadata("design:type", String)
], ProductMediaDto.prototype, "url", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], ProductMediaDto.prototype, "name", void 0);
__decorate([
    IsIn(['image', 'video']),
    __metadata("design:type", String)
], ProductMediaDto.prototype, "type", void 0);
export class CreateProductDto {
    name;
    slug;
    price;
    categoryId;
    saleUnit;
    description;
    composition;
    width;
    feel;
    care;
    color;
    texture;
    badge;
    imageUrl;
    gallery;
    stock;
    active;
}
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "slug", void 0);
__decorate([
    ApiProperty(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    ApiProperty(),
    IsUUID(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoryId", void 0);
__decorate([
    ApiProperty({ required: false, enum: ['trouser', 'item'], description: 'Unit used for product pricing and quantities.' }),
    IsOptional(),
    IsIn(['trouser', 'item']),
    __metadata("design:type", String)
], CreateProductDto.prototype, "saleUnit", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "composition", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "width", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "feel", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "care", void 0);
__decorate([
    IsOptional(),
    IsHexColor(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "color", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "texture", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "badge", void 0);
__decorate([
    IsOptional(),
    IsUrl({ require_tld: false }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "imageUrl", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ProductMediaDto),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "gallery", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "active", void 0);
export class UpdateProductDto extends PartialType(CreateProductDto) {
}
//# sourceMappingURL=catalog.dto.js.map