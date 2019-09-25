export interface Og {
    type: string;
    site_name: string;
    title: string;
    description: string;
    url: string;
    image: string;
    imageType: string;
}
/**
 * Для поисковиков
 */
export declare class Seo {
    sUrl: string;
    sTitle: string;
    sDescription: string;
    sKeywords: string;
    og: Og;
    sLogoUrl: string;
    constructor();
    reload(): void;
    protected main(): void;
}
