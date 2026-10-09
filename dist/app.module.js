var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import Joi from 'joi';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { StorageModule } from './modules/storage/storage.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string()
                        .valid('development', 'test', 'production')
                        .default('development'),
                    PORT: Joi.number().default(4000),
                    DATABASE_URL: Joi.string().uri().required(),
                    DIRECT_URL: Joi.string().uri().optional(),
                    DB_SSL: Joi.string().valid('true', 'false').default('true'),
                    CORS_ORIGINS: Joi.string().required(),
                    NEON_AUTH_BASE_URL: Joi.string()
                        .uri({ scheme: ['https'] })
                        .required(),
                    NEON_AUTH_JWKS_URL: Joi.string()
                        .uri({ scheme: ['https'] })
                        .required(),
                    AWS_REGION: Joi.string().required(),
                    AWS_ACCESS_KEY_ID: Joi.string().required(),
                    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
                    AWS_ENDPOINT_URL_S3: Joi.string().uri().required(),
                    STORAGE_BUCKET: Joi.string().required(),
                }),
            }),
            ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            TypeOrmModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.getOrThrow('DATABASE_URL'),
                    autoLoadEntities: true,
                    synchronize: false,
                    migrationsRun: true,
                    migrations: ['dist/database/migrations/*.js'],
                    ssl: config.get('DB_SSL') === 'true'
                        ? { rejectUnauthorized: false }
                        : false,
                }),
            }),
            UsersModule,
            AuthModule,
            CatalogModule,
            OrdersModule,
            StorageModule,
        ],
        controllers: [AppController],
        providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map