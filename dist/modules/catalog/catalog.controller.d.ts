import { CatalogService } from './catalog.service.js';
import { CreateCategoryDto, CreateProductDto, UpdateCategoryDto, UpdateProductDto } from './catalog.dto.js';
export declare class CatalogController {
    private catalog;
    constructor(catalog: CatalogService);
    products(search?: string, category?: string): Promise<import("./catalog.entities.js").Product[]>;
    product(slug: string): Promise<import("./catalog.entities.js").Product>;
    categories(): Promise<import("./catalog.entities.js").Category[]>;
}
export declare class AdminCatalogController {
    private catalog;
    constructor(catalog: CatalogService);
    categories(): Promise<import("./catalog.entities.js").Category[]>;
    products(): Promise<import("./catalog.entities.js").Product[]>;
    createProduct(dto: CreateProductDto): Promise<import("./catalog.entities.js").Product>;
    updateProduct(id: string, dto: UpdateProductDto): Promise<import("./catalog.entities.js").Product>;
    deleteProduct(id: string): Promise<void>;
    createCategory(dto: CreateCategoryDto): Promise<import("./catalog.entities.js").Category>;
    updateCategory(id: string, dto: UpdateCategoryDto): Promise<import("./catalog.entities.js").Category>;
    deleteCategory(id: string): Promise<void>;
}
