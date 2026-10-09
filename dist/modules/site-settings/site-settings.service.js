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
export const defaultStorySettings = {
    eyebrow: "Our story",
    title: "Fabric is where every great idea begins.",
    intro: "HSG Texture brings the discovery and delight of a great fabric market into a calm, considered shopping experience.",
    paragraphOne: "We started with a simple belief: choosing fabric should feel as inspiring as wearing the finished piece. So we source in small, intentional edits—prioritising beautiful hand-feel, dependable quality and colours that come alive in natural light.",
    paragraphTwo: "From heritage occasion cloth to easy linens and statement prints, our collection is made for designers, tailors, stylists and curious first-time makers.",
    valuesEyebrow: "What guides us",
    values: [
        {
            id: "story-value-1",
            number: "01",
            title: "Quality in the hand",
            description: "We choose fabrics by touch, drape and durability—not just appearance.",
        },
        {
            id: "story-value-2",
            number: "02",
            title: "Heritage, kept alive",
            description: "We champion textiles and techniques with stories worth carrying forward.",
        },
        {
            id: "story-value-3",
            number: "03",
            title: "Service, person to person",
            description: "Thoughtful help from people who know fabric and respect your vision.",
        },
    ],
    collageMediaIds: [],
    collageMedia: [],
    feedbackEyebrow: "From our customers",
    feedbackTitle: "Worn, loved and remembered.",
    feedbackIntro: "Real stories from customers who chose HSG Texture for moments that matter.",
    feedback: [],
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
    async getStory() {
        const record = await this.record();
        const story = {
            ...defaultStorySettings,
            ...record.story,
        };
        const collageMedia = story.collageMedia ?? [];
        const feedback = story.feedback ?? [];
        return {
            ...story,
            collageMedia: collageMedia.map((media) => media
                ? { ...media, url: this.storage.createReadUrl(media.key).url }
                : null),
            feedback: feedback.map((item) => ({
                ...item,
                mediaUrl: item.mediaKey
                    ? this.storage.createReadUrl(item.mediaKey).url
                    : undefined,
            })),
        };
    }
    async updateStory(story) {
        const current = await this.record();
        const oldStory = (current.story ?? {});
        const collectKeys = (value) => [
            ...(value.collageMedia ??
                []).map((item) => item?.key),
            ...(value.feedback ?? []).map((item) => item.mediaKey),
        ].filter((key) => Boolean(key));
        const previousKeys = collectKeys(oldStory);
        const clean = JSON.parse(JSON.stringify(story));
        for (const media of clean.collageMedia ?? [])
            if (media)
                delete media.url;
        for (const item of clean.feedback ?? [])
            delete item.mediaUrl;
        current.story = { ...defaultStorySettings, ...clean };
        await this.settings.save(current);
        const nextKeys = collectKeys(clean);
        await Promise.all(previousKeys
            .filter((key) => !nextKeys.includes(key))
            .map((key) => this.storage.remove(key).catch(() => undefined)));
        return this.getStory();
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