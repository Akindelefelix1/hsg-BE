import { Repository } from "typeorm";
import { StorageService } from "../storage/storage.service.js";
import { UpdateSiteSettingsDto } from "./site-settings.dto.js";
import { SiteSettings, type SiteSettingsContent } from "./site-settings.entity.js";
export declare const defaultSiteSettings: SiteSettingsContent;
export declare const defaultStorySettings: {
    eyebrow: string;
    title: string;
    intro: string;
    paragraphOne: string;
    paragraphTwo: string;
    valuesEyebrow: string;
    values: {
        id: string;
        number: string;
        title: string;
        description: string;
    }[];
    collageMediaIds: never[];
    collageMedia: never[];
    feedbackEyebrow: string;
    feedbackTitle: string;
    feedbackIntro: string;
    feedback: never[];
};
export declare class SiteSettingsService {
    private readonly settings;
    private readonly storage;
    constructor(settings: Repository<SiteSettings>, storage: StorageService);
    private record;
    get(): Promise<{
        heroImageKey: string | undefined;
        heroImageUrl: string | undefined;
        announcement: string;
        heroEyebrow: string;
        heroTitle: string;
        heroAccent: string;
        heroDescription: string;
        primaryLabel: string;
        primaryHref: string;
        secondaryLabel: string;
        secondaryHref: string;
        trustOne: string;
        trustTwo: string;
        imageNote: string;
    }>;
    update(dto: UpdateSiteSettingsDto): Promise<{
        heroImageKey: string | undefined;
        heroImageUrl: string | undefined;
        announcement: string;
        heroEyebrow: string;
        heroTitle: string;
        heroAccent: string;
        heroDescription: string;
        primaryLabel: string;
        primaryHref: string;
        secondaryLabel: string;
        secondaryHref: string;
        trustOne: string;
        trustTwo: string;
        imageNote: string;
    }>;
    getStory(): Promise<{
        collageMedia: ({
            url: string;
            key: string;
            name: string;
            type: string;
        } | null)[];
        feedback: {
            mediaUrl: string | undefined;
            mediaKey?: string;
        }[];
    }>;
    updateStory(story: Record<string, unknown>): Promise<{
        collageMedia: ({
            url: string;
            key: string;
            name: string;
            type: string;
        } | null)[];
        feedback: {
            mediaUrl: string | undefined;
            mediaKey?: string;
        }[];
    }>;
}
