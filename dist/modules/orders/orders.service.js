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
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../catalog/catalog.entities.js';
import { Order, OrderItem } from './order.entities.js';
let OrdersService = class OrdersService {
    orders;
    products;
    constructor(orders, products) {
        this.orders = orders;
        this.products = products;
    }
    async create(dto) {
        const products = await this.products.findBy({
            id: In(dto.items.map((i) => i.productId)),
            active: true,
        });
        if (products.length !== new Set(dto.items.map((i) => i.productId)).size)
            throw new BadRequestException('One or more products are unavailable');
        const items = dto.items.map((line) => {
            const product = products.find((p) => p.id === line.productId);
            return Object.assign(new OrderItem(), {
                product,
                quantity: line.quantity,
                unitPrice: product.price,
            });
        });
        const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        return this.orders.save(this.orders.create(Object.assign({}, dto, { items, total })));
    }
    list() {
        return this.orders.find({ order: { createdAt: 'DESC' } });
    }
    async status(id, status) {
        await this.orders.update(id, { status });
        return this.orders.findOneByOrFail({ id });
    }
};
OrdersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Order)),
    __param(1, InjectRepository(Product)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], OrdersService);
export { OrdersService };
//# sourceMappingURL=orders.service.js.map