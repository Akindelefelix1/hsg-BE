var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { UsersModule } from './modules/users/users.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
            ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            TypeOrmModule.forRootAsync({ inject: [ConfigService], useFactory: (config) => ({ type: 'postgres', url: config.getOrThrow('DATABASE_URL'), autoLoadEntities: true, synchronize: config.get('NODE_ENV') !== 'production', ssl: config.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false }) }),
            UsersModule, AuthModule, CatalogModule, OrdersModule,
        ],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map