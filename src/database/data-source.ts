import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../modules/users/user.entity.js';
import { Category, Product } from '../modules/catalog/catalog.entities.js';
import { Order, OrderItem } from '../modules/orders/order.entities.js';
export default new DataSource({
  type: 'postgres',
  url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: [User, Category, Product, Order, OrderItem],
  migrations: ['src/database/migrations/*.ts'],
});
