var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
let Category = class Category {
    id;
    name;
    slug;
    description;
    section;
    sortOrder;
    active;
    deletedAt;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    Index({ unique: true }),
    Column(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Category.prototype, "slug", void 0);
__decorate([
    Column({ default: '' }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    Column({ default: 'fabric' }),
    __metadata("design:type", String)
], Category.prototype, "section", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], Category.prototype, "sortOrder", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], Category.prototype, "active", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Category.prototype, "deletedAt", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
Category = __decorate([
    Entity('categories')
], Category);
export { Category };
let Product = class Product {
    id;
    slug;
    name;
    price;
    currency;
    description;
    color;
    texture;
    badge;
    imageUrl;
    gallery;
    active;
    stock;
    category;
    deletedAt;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    Index({ unique: true }),
    Column(),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Column({ type: 'decimal', precision: 12, scale: 2, transformer: { to: (v) => v, from: (v) => Number(v) } }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    Column({ default: 'NGN' }),
    __metadata("design:type", String)
], Product.prototype, "currency", void 0);
__decorate([
    Column({ default: '' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    Column({ default: '#183b8f' }),
    __metadata("design:type", String)
], Product.prototype, "color", void 0);
__decorate([
    Column({ default: 'woven' }),
    __metadata("design:type", String)
], Product.prototype, "texture", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "badge", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
__decorate([
    Column({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "gallery", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "active", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    ManyToOne(() => Category, { eager: true, onDelete: 'RESTRICT' }),
    __metadata("design:type", Category)
], Product.prototype, "category", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "deletedAt", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
Product = __decorate([
    Entity('products')
], Product);
export { Product };
//# sourceMappingURL=catalog.entities.js.map