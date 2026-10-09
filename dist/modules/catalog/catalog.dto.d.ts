export declare class CreateCategoryDto {
    name: string;
    slug: string;
    description?: string;
    section?: 'fabric' | 'accessories';
    sortOrder?: number;
    active?: boolean;
}
declare const UpdateCategoryDto_base: import("@nestjs/common").Type<Partial<CreateCategoryDto>>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
}
export declare class ProductMediaDto {
    key: string;
    url: string;
    name: string;
    type: 'image' | 'video';
}
export declare class CreateProductDto {
    name: string;
    slug: string;
    price: number;
    categoryId: string;
    saleUnit?: 'trouser' | 'item';
    description?: string;
    composition?: string;
    width?: string;
    feel?: string;
    care?: string;
    color?: string;
    texture?: string;
    badge?: string;
    imageUrl?: string;
    gallery?: ProductMediaDto[];
    stock?: number;
    active?: boolean;
}
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export {};
