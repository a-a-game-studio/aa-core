"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
const sharp = require("sharp");
/**
 * Сохранить Base64 строку в файл
 * @param base64Image
 * @param sFile
 */
exports.faSaveBase64ToFile = (base64Image, sFile) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(sFile, exports.fGetBase64Str(base64Image), { encoding: 'base64' }, function (err) {
            resolve(true);
        });
    });
};
/**
 * Сохранить из буфера в файл
 * @param img
 * @param sFile
 */
exports.faSaveBufferToFile = (img, sFile) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(sFile, img, function (err) {
            resolve(true);
        });
    });
};
/**
 * Картинка base64 в Buffer
 * @param sDataBase64
 */
exports.fImgBase64ToBuffer = (sDataBase64) => {
    return Buffer.from(exports.fGetBase64Str(sDataBase64), 'base64');
};
/**
 * Вырезает лишнее из строки Base64
 * @param sBase64
 */
exports.fGetBase64Str = (sBase64) => sBase64.split(';base64,').pop();
const imgQuality = 80; // качество сжатия
/**
 * Изменить размер картинки и сохранить в файл
 * @param width
 * @param file
 */
exports.faResizeToBuffer = async (width, sDataBase64) => {
    return await sharp(exports.fImgBase64ToBuffer(sDataBase64))
        .resize(width)
        .jpeg({
        quality: imgQuality,
    })
        .toBuffer();
};
//# sourceMappingURL=ImgS.js.map