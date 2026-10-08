import { Repository } from 'typeorm';
import { Product } from '../catalog/catalog.entities.js';
import { CreateOrderDto } from './orders.dto.js';
import { Order, OrderStatus } from './order.entities.js';
export declare class OrdersService {
    private orders;
    private products;
    constructor(orders: Repository<Order>, products: Repository<Product>);
    create(dto: CreateOrderDto): Promise<Order>;
    list(): Promise<Order[]>;
    status(id: string, status: OrderStatus): Promise<Order>;
}
