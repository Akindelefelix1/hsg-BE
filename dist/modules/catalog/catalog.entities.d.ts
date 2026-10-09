export type ProductMedia = {
    key: string;
    url: string;
    name: string;
    type: 'image' | 'video';
};
export declare class Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    section: 'fabric' | 'accessories';
    sortOrder: number;
    active: boolean;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    saleUnit: 'trouser' | 'item';
    currency: string;
    description: string;
    composition?: string;
    width?: string;
    feel?: string;
    care?: string;
    color: string;
    texture: string;
    badge?: string;
    imageUrl?: string;
    gallery: ProductMedia[];
    active: boolean;
    stock: number;
    category: Category;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
