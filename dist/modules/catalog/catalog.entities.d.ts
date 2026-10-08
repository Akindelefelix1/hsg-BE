export declare class Category {
    id: string;
    name: string;
    slug: string;
    description: string;
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
    currency: string;
    description: string;
    imageUrl?: string;
    gallery: string[];
    active: boolean;
    stock: number;
    category: Category;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
