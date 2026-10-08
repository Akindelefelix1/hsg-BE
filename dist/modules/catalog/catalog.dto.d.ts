export declare class CreateCategoryDto {
    name: string;
    slug: string;
    description?: string;
    active?: boolean;
}
declare const UpdateCategoryDto_base: import("@nestjs/common").Type<Partial<CreateCategoryDto>>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
}
export declare class CreateProductDto {
    name: string;
    slug: string;
    price: number;
    categoryId: string;
    description?: string;
    imageUrl?: string;
    gallery?: string[];
    stock?: number;
    active?: boolean;
}
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export {};
