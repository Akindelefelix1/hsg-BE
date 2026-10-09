export type SiteSettingsContent = {
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
};
export declare class SiteSettings {
    id: string;
    content: SiteSettingsContent;
    heroImageKey?: string | null;
    updatedAt: Date;
}
