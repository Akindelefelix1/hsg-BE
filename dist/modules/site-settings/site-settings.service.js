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
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StorageService } from "../storage/storage.service.js";
import { SiteSettings, } from "./site-settings.entity.js";
export const defaultSiteSettings = {
    announcement: "Same-day or next-day delivery is available, depending on when your order is placed and the delivery location.",
    heroEyebrow: "The new textile edit",
    heroTitle: "Find the fabric.",
    heroAccent: "Make it yours.",
    heroDescription: "Quality fabrics for every occasion.",
    primaryLabel: "Shop new arrivals",
    primaryHref: "/products?filter=new",
    secondaryLabel: "Explore collections",
    secondaryHref: "/category",
    trustOne: "Nationwide delivery",
    trustTwo: "Curated quality",
    imageNote: "Texture you can almost feel",
};
let SiteSettingsService = class SiteSettingsService {
    settings;
    storage;
    constructor(settings, storage) {
        this.settings = settings;
        this.storage = storage;
    }
    async record() {
        const existing = await this.settings.findOneBy({ id: "storefront" });
        if (existing)
            return existing;
        return this.settings.save(this.settings.create({
            id: "storefront",
            content: defaultSiteSettings,
        }));
    }
    async get() {
        const record = await this.record();
        let heroImageUrl;
        if (record.heroImageKey) {
            try {
                heroImageUrl = this.storage.createReadUrl(record.heroImageKey).url;
            }
            catch {
            }
        }
        return {
            ...defaultSiteSettings,
            ...record.content,
            heroImageKey: record.heroImageKey ?? undefined,
            heroImageUrl,
        };
    }
    async update(dto) {
        const current = await this.record();
        const previousHeroImageKey = current.heroImageKey;
        const { heroImageKey, ...content } = dto;
        current.content = {
            ...defaultSiteSettings,
            ...current.content,
            ...content,
        };
        if (heroImageKey !== undefined)
            current.heroImageKey = heroImageKey;
        await this.settings.save(current);
        if (heroImageKey &&
            previousHeroImageKey &&
            heroImageKey !== previousHeroImageKey) {
            try {
                await this.storage.remove(previousHeroImageKey);
            }
            catch {
            }
        }
        return this.get();
    }
};
SiteSettingsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(SiteSettings)),
    __metadata("design:paramtypes", [Repository,
        StorageService])
], SiteSettingsService);
export { SiteSettingsService };
//# sourceMappingURL=site-settings.service.js.map