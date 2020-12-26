"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
// Системные классы
const BaseM_1 = __importDefault(require("../../../System/BaseM"));
// Классы SQL Запросов
const FileSQL_1 = require("../../../Infrastructure/SQL/Repository/FileSQL");
const FileV_1 = require("../FileV");
const ImgSQL_1 = require("../../../Infrastructure/SQL/Repository/ImgSQL");
exports.fMd5 = (s) => {
    return crypto.createHash('md5').update(s).digest("hex");
    ;
};
/**
 * Файлы
 */
class FileM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.fileSQL = new FileSQL_1.FileSQL(req);
        this.imgSql = new ImgSQL_1.ImgSQL(req);
    }
    /**
     * Ресайз изображений
     * незабыть переопределить
     * @param imageResizeS
     */
    fSetImageResizeS(imageResizeS) {
        this.imgS.fSetImageResizeS(imageResizeS);
    }
    // =====================================
    /**
     * Добавить картику
     */
    async addImg(data, sSaveFilePath) {
        const validData = this.logicSys.fValidData(FileV_1.FileV.saveImg(), data);
        const fileMd5 = exports.fMd5(validData.fileBase64);
        const fileName = fileMd5 + '.jpg';
        const vFile = await this.imgSql.getImgByFileName(fileMd5);
        /* TODO: добавить обрезку */
        /* TODO: добавить растаскивание по папкам */
        if (!vFile) {
            let img = {
                file_name: fileMd5,
                f_320: '',
                f_800: '',
                f_1024: '',
            };
            /* Режем картинки */
            const file320 = await this.imgS.faResizeToBuffer(320, validData.fileBase64);
            const file800 = await this.imgS.faResizeToBuffer(800, validData.fileBase64);
            const file1024 = await this.imgS.faResizeToBuffer(1024, validData.fileBase64);
            /* получаем имена файлов */
            img.f_320 = exports.fMd5(file320.toString('base64'));
            img.f_800 = exports.fMd5(file800.toString('base64'));
            img.f_1024 = exports.fMd5(file1024.toString('base64'));
            await this.imgS.faSaveBufferToFile(file320, sSaveFilePath + img.f_320 + '.jpg');
            await this.imgS.faSaveBufferToFile(file800, sSaveFilePath + img.f_800 + '.jpg');
            await this.imgS.faSaveBufferToFile(file1024, sSaveFilePath + img.f_1024 + '.jpg');
            /* вставляем файлы */
            await this.fileSQL.faInsert({
                file_name: img.f_320,
            });
            await this.fileSQL.faInsert({
                file_name: img.f_800,
            });
            await this.fileSQL.faInsert({
                file_name: img.f_1024,
            });
            /* вставляем картинку */
            await this.imgSql.faInsert(img);
        }
        // Формирование ответа
        let out = null;
        if (this.errorSys.isOk()) {
            out = {
                file_name: fileMd5,
            };
        }
        return out;
    }
}
exports.FileM = FileM;
//# sourceMappingURL=FileM.js.map