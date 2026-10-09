import { Repository } from 'typeorm';
import { Category, Product } from './catalog.entities.js';
import { CreateCategoryDto, CreateProductDto, UpdateCategoryDto, UpdateProductDto } from './catalog.dto.js';
export declare class CatalogService {
    private products;
    private categories;
    constructor(products: Repository<Product>, categories: Repository<Category>);
    listProducts(search?: string, category?: string): Promise<Product[]>;
    getProduct(slug: string): Promise<Product>;
    listCategories(): Promise<Category[]>;
    listAdminCategories(): Promise<Category[]>;
    listAdminProducts(): Promise<Product[]>;
    createCategory(dto: CreateCategoryDto): Promise<Category>;
    updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category>;
    deleteCategory(id: string): Promise<void>;
    createProduct(dto: CreateProductDto): Promise<Product>;
    updateProduct(id: string, dto: UpdateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
}
