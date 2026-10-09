var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard, Public, Role, Roles, RolesGuard, } from "../../common/auth.js";
import { UpdateSiteSettingsDto } from "./site-settings.dto.js";
import { SiteSettingsService } from "./site-settings.service.js";
let SiteSettingsController = class SiteSettingsController {
    settings;
    constructor(settings) {
        this.settings = settings;
    }
    get() {
        return this.settings.get();
    }
};
__decorate([
    Public(),
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "get", null);
SiteSettingsController = __decorate([
    ApiTags("settings"),
    Controller("settings"),
    __metadata("design:paramtypes", [SiteSettingsService])
], SiteSettingsController);
export { SiteSettingsController };
let AdminSiteSettingsController = class AdminSiteSettingsController {
    settings;
    constructor(settings) {
        this.settings = settings;
    }
    get() {
        return this.settings.get();
    }
    update(dto) {
        return this.settings.update(dto);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSiteSettingsController.prototype, "get", null);
__decorate([
    Put(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateSiteSettingsDto]),
    __metadata("design:returntype", void 0)
], AdminSiteSettingsController.prototype, "update", null);
AdminSiteSettingsController = __decorate([
    ApiTags("admin settings"),
    ApiBearerAuth(),
    Roles(Role.ADMIN),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller("admin/settings"),
    __metadata("design:paramtypes", [SiteSettingsService])
], AdminSiteSettingsController);
export { AdminSiteSettingsController };
//# sourceMappingURL=site-settings.controller.js.map