import { OrderStatus } from './order.entities.js';
declare class OrderLineDto {
    productId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    customerName: string;
    phone: string;
    email?: string;
    deliveryAddress: string;
    items: OrderLineDto[];
}
export declare class UpdateOrderStatusDto {
    status: OrderStatus;
}
export {};
