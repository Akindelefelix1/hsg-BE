import { Product } from '../catalog/catalog.entities.js';
import { User } from '../users/user.entity.js';
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    FULFILLED = "fulfilled",
    CANCELLED = "cancelled"
}
export declare class Order {
    id: string;
    user?: User;
    customerName: string;
    phone: string;
    email?: string;
    deliveryAddress: string;
    status: OrderStatus;
    total: number;
    items: OrderItem[];
    createdAt: Date;
}
export declare class OrderItem {
    id: string;
    order: Order;
    product: Product;
    quantity: number;
    unitPrice: number;
}
