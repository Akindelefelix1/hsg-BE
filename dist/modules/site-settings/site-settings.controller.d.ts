import { UpdateSiteSettingsDto, UpdateStorySettingsDto } from "./site-settings.dto.js";
import { SiteSettingsService } from "./site-settings.service.js";
export declare class SiteSettingsController {
    private readonly settings;
    constructor(settings: SiteSettingsService);
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
}
export declare class AdminSiteSettingsController {
    private readonly settings;
    constructor(settings: SiteSettingsService);
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
}
export declare class StoryController {
    private readonly settings;
    constructor(settings: SiteSettingsService);
    get(): Promise<{
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
export declare class AdminStoryController {
    private readonly settings;
    constructor(settings: SiteSettingsService);
    get(): Promise<{
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
    update(dto: UpdateStorySettingsDto): Promise<{
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
