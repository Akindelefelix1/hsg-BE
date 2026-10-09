var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StorageModule } from "../storage/storage.module.js";
import { AdminSiteSettingsController, SiteSettingsController, } from "./site-settings.controller.js";
import { SiteSettings } from "./site-settings.entity.js";
import { SiteSettingsService } from "./site-settings.service.js";
let SiteSettingsModule = class SiteSettingsModule {
};
SiteSettingsModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([SiteSettings]), StorageModule],
        controllers: [SiteSettingsController, AdminSiteSettingsController],
        providers: [SiteSettingsService],
    })
], SiteSettingsModule);
export { SiteSettingsModule };
//# sourceMappingURL=site-settings.module.js.map