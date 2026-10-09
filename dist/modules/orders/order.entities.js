var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../catalog/catalog.entities.js';
import { User } from '../users/user.entity.js';
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["FULFILLED"] = "fulfilled";
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus || (OrderStatus = {}));
let Order = class Order {
    id;
    user;
    customerName;
    phone;
    email;
    deliveryAddress;
    status;
    total;
    items;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, { nullable: true }),
    __metadata("design:type", User)
], Order.prototype, "user", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "customerName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "phone", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "deliveryAddress", void 0);
__decorate([
    Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    Column({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    OneToMany(() => OrderItem, item => item.order, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
Order = __decorate([
    Entity('orders')
], Order);
export { Order };
let OrderItem = class OrderItem {
    id;
    order;
    product;
    quantity;
    unitPrice;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' }),
    __metadata("design:type", Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    ManyToOne(() => Product, { eager: true }),
    __metadata("design:type", Product)
], OrderItem.prototype, "product", void 0);
__decorate([
    Column({ type: 'decimal', precision: 8, scale: 2 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    Column({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "unitPrice", void 0);
OrderItem = __decorate([
    Entity('order_items')
], OrderItem);
export { OrderItem };
//# sourceMappingURL=order.entities.js.map