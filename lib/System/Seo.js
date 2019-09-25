"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Для поисковиков
 */
class Seo {
    constructor() {
        this.sUrl = '/'; // входящий url
        this.sLogoUrl = '';
        this.sTitle = 'Site title';
        this.sDescription = 'site description';
        this.sKeywords = 'site api';
        this.og = {
            type: 'website',
            site_name: 'website',
            title: this.sTitle,
            description: this.sDescription,
            url: this.sUrl,
            image: this.sLogoUrl,
            imageType: 'image/jpeg',
        };
    }
    reload() {
        this.og = {
            type: 'website',
            site_name: 'website',
            title: this.sTitle,
            description: this.sDescription,
            url: this.sUrl,
            image: this.sLogoUrl,
            imageType: 'image/jpeg',
        };
    }
    main() {
        this.sTitle = 'Site title';
    }
}
exports.Seo = Seo;
//# sourceMappingURL=Seo.js.map