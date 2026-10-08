import { CreateOrderDto, UpdateOrderStatusDto } from './orders.dto.js';
import { OrdersService } from './orders.service.js';
export declare class OrdersController {
    private orders;
    constructor(orders: OrdersService);
    create(dto: CreateOrderDto): Promise<import("./order.entities.js").Order>;
    list(): Promise<import("./order.entities.js").Order[]>;
    status(id: string, dto: UpdateOrderStatusDto): Promise<import("./order.entities.js").Order>;
}
