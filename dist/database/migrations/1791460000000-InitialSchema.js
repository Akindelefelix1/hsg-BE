export class InitialSchema1791460000000 {
    async up(q) {
        await q.query(`CREATE TYPE "users_role_enum" AS ENUM ('admin','customer')`);
        await q.query(`CREATE TYPE "orders_status_enum" AS ENUM ('pending','confirmed','fulfilled','cancelled')`);
        await q.query(`CREATE TABLE "users" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),"email" varchar NOT NULL UNIQUE,"passwordHash" varchar NOT NULL,"name" varchar NOT NULL,"role" users_role_enum NOT NULL DEFAULT 'customer',"refreshTokenHash" varchar,"active" boolean NOT NULL DEFAULT true,"createdAt" timestamptz NOT NULL DEFAULT now(),"updatedAt" timestamptz NOT NULL DEFAULT now())`);
        await q.query(`CREATE TABLE "categories" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),"name" varchar NOT NULL UNIQUE,"slug" varchar NOT NULL UNIQUE,"description" varchar NOT NULL DEFAULT '',"active" boolean NOT NULL DEFAULT true,"deletedAt" timestamptz,"createdAt" timestamptz NOT NULL DEFAULT now(),"updatedAt" timestamptz NOT NULL DEFAULT now())`);
        await q.query(`CREATE TABLE "products" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),"slug" varchar NOT NULL UNIQUE,"name" varchar NOT NULL,"price" numeric(12,2) NOT NULL,"currency" varchar NOT NULL DEFAULT 'NGN',"description" varchar NOT NULL DEFAULT '',"imageUrl" varchar,"gallery" jsonb NOT NULL DEFAULT '[]',"active" boolean NOT NULL DEFAULT true,"stock" integer NOT NULL DEFAULT 0,"categoryId" uuid NOT NULL REFERENCES "categories"("id") ON DELETE RESTRICT,"deletedAt" timestamptz,"createdAt" timestamptz NOT NULL DEFAULT now(),"updatedAt" timestamptz NOT NULL DEFAULT now())`);
        await q.query(`CREATE TABLE "orders" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),"userId" uuid REFERENCES "users"("id"),"customerName" varchar NOT NULL,"phone" varchar NOT NULL,"email" varchar,"deliveryAddress" varchar NOT NULL,"status" orders_status_enum NOT NULL DEFAULT 'pending',"total" numeric(12,2) NOT NULL,"createdAt" timestamptz NOT NULL DEFAULT now())`);
        await q.query(`CREATE TABLE "order_items" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),"orderId" uuid NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,"productId" uuid NOT NULL REFERENCES "products"("id"),"quantity" numeric(8,2) NOT NULL,"unitPrice" numeric(12,2) NOT NULL)`);
    }
    async down(q) {
        await q.query('DROP TABLE "order_items"');
        await q.query('DROP TABLE "orders"');
        await q.query('DROP TABLE "products"');
        await q.query('DROP TABLE "categories"');
        await q.query('DROP TABLE "users"');
        await q.query('DROP TYPE "orders_status_enum"');
        await q.query('DROP TYPE "users_role_enum"');
    }
}
//# sourceMappingURL=1791460000000-InitialSchema.js.map