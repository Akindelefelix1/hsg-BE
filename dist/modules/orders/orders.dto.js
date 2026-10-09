var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Matches, Min, ValidateNested } from 'class-validator';
import { OrderStatus } from './order.entities.js';
class OrderLineDto {
    productId;
    quantity;
}
__decorate([
    ApiProperty(),
    IsUUID(),
    __metadata("design:type", String)
], OrderLineDto.prototype, "productId", void 0);
__decorate([
    ApiProperty(),
    IsNumber(),
    Min(.5),
    __metadata("design:type", Number)
], OrderLineDto.prototype, "quantity", void 0);
export class CreateOrderDto {
    customerName;
    phone;
    email;
    deliveryAddress;
    items;
}
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "customerName", void 0);
__decorate([
    ApiProperty({ example: '+2348012345678', description: 'Accepts Nigerian international (+234...) or local (080...) format.' }),
    Matches(/^(?:\+234[789][01]\d{8}|0[789][01]\d{8})$/),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "phone", void 0);
__decorate([
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "email", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "deliveryAddress", void 0);
__decorate([
    ApiProperty({ type: [OrderLineDto] }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => OrderLineDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
export class UpdateOrderStatusDto {
    status;
}
__decorate([
    ApiProperty({ enum: OrderStatus }),
    IsEnum(OrderStatus),
    __metadata("design:type", String)
], UpdateOrderStatusDto.prototype, "status", void 0);
//# sourceMappingURL=orders.dto.js.map