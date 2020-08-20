"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgS = exports.ImgResizeBaseS = void 0;
var fs = require('fs');
const System_1 = require("../Namespace/System");
const imgQuality = 80; // качество сжатия
/**
 * Класс ресайза изображений
 */
class ImgResizeBaseS {
    faResize(data, width, quality) {
        return null;
    }
}
exports.ImgResizeBaseS = ImgResizeBaseS;
/**
 * Сервис автоматизаций по работе с картинками
 */
class ImgS extends System_1.BaseM {
    constructor() {
        super(...arguments);
        this.nImgQuality = imgQuality; // качество сжатия
    }
    /**
     * Ресайз изображений
     * незабыть переопределить
     * @param imageResizeS
     */
    fSetImageResizeS(imageResizeS) {
        this.imageResizeS = imageResizeS;
    }
    /**
     * Сохранить Base64 строку в файл
     * @param base64Image
     * @param sFile
     */
    async faSaveBase64ToFile(base64Image, sFile) {
        return new Promise((resolve, reject) => {
            fs.writeFile(sFile, this.fGetBase64Str(base64Image), { encoding: 'base64' }, function (err) {
                resolve(true);
            });
        });
    }
    /**
     * Сохранить из буфера в файл
     * @param img
     * @param sFile
     */
    async faSaveBufferToFile(img, sFile) {
        return new Promise((resolve, reject) => {
            fs.writeFile(sFile, img, function (err) {
                resolve(true);
            });
        });
    }
    /**
     * Картинка base64 в Buffer
     * @param sDataBase64
     */
    fImgBase64ToBuffer(sDataBase64) {
        return Buffer.from(this.fGetBase64Str(sDataBase64), 'base64');
    }
    /**
     * Вырезает лишнее из строки Base64
     * @param sBase64
     */
    fGetBase64Str(sBase64) {
        return sBase64.split(';base64,').pop();
    }
    /**
     * Изменить размер картинки и сохранить в файл
     * @param width
     * @param file
     */
    async faResizeToBuffer(width, sDataBase64) {
        return (await this.imageResizeS.faResize(this.fImgBase64ToBuffer(sDataBase64), width, this.nImgQuality));
    }
}
exports.ImgS = ImgS;
//# sourceMappingURL=ImgS.js.map