var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Category, Product } from './catalog.entities.js';
let CatalogService = class CatalogService {
    products;
    categories;
    constructor(products, categories) {
        this.products = products;
        this.categories = categories;
    }
    listProducts(search, category) { return this.products.find({ where: { active: true, ...(search ? { name: ILike(`%${search}%`) } : {}), ...(category ? { category: { slug: category } } : {}) }, order: { createdAt: 'DESC' } }); }
    getProduct(slug) { return this.products.findOneByOrFail({ slug, active: true }).catch(() => { throw new NotFoundException('Product not found'); }); }
    listCategories() { return this.categories.find({ where: { active: true }, order: { sortOrder: 'ASC', createdAt: 'ASC' } }); }
    listAdminCategories() { return this.categories.find({ order: { sortOrder: 'ASC', createdAt: 'ASC' } }); }
    listAdminProducts() { return this.products.find({ order: { createdAt: 'DESC' } }); }
    async createCategory(dto) { const sortOrder = dto.sortOrder ?? await this.categories.countBy({ section: dto.section ?? 'fabric' }); return this.categories.save(this.categories.create({ ...dto, sortOrder })); }
    async updateCategory(id, dto) { await this.categories.update(id, dto); return this.categories.findOneByOrFail({ id }); }
    async deleteCategory(id) { await this.categories.softDelete(id); }
    async createProduct(dto) { const category = await this.categories.findOneByOrFail({ id: dto.categoryId }); return this.products.save(this.products.create(Object.assign({}, dto, { category }))); }
    async updateProduct(id, dto) { const { categoryId, ...data } = dto; const category = categoryId ? await this.categories.findOneByOrFail({ id: categoryId }) : undefined; await this.products.update(id, Object.assign({}, data, category ? { category } : {})); return this.products.findOneByOrFail({ id }); }
    async deleteProduct(id) { await this.products.softDelete(id); }
};
CatalogService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Product)),
    __param(1, InjectRepository(Category)),
    __metadata("design:paramtypes", [Repository, Repository])
], CatalogService);
export { CatalogService };
//# sourceMappingURL=catalog.service.js.map