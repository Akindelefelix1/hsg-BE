import { UpdateSiteSettingsDto } from "./site-settings.dto.js";
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
