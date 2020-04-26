"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
const ImgS = __importStar(require("./ImgS"));
// Системные классы
const BaseM_1 = __importDefault(require("../../../System/BaseM"));
// Классы SQL Запросов
const FileSQL_1 = require("../../../Infrastructure/SQL/Repository/FileSQL");
// Валидация
const V = __importStar(require("../Validator/FileV"));
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
    // =====================================
    /**
     * Добавить картику
     * @param data
     */
    async addImg(data, sSaveFilePath) {
        let out = null;
        data = V.saveImg.valid(this.req, data);
        let ok = this.errorSys.isOk();
        const fileBase64 = data.fileBase64;
        const fileMd5 = exports.fMd5(fileBase64);
        const fileName = fileMd5 + '.jpg';
        const vFile = await this.imgSql.getImgByFileName(fileMd5);
        /* TODO: добавить обрезку */
        /* TODO: добавить растаскивание по папкам */
        if (vFile) {
            out = {
                file_name: fileMd5,
            };
        }
        else {
            let img = {
                file_name: fileMd5,
                f_320: '',
                f_800: '',
                f_1024: '',
            };
            /* Режем картинки */
            const file320 = await ImgS.faResizeToBuffer(320, fileBase64);
            const file800 = await ImgS.faResizeToBuffer(800, fileBase64);
            const file1024 = await ImgS.faResizeToBuffer(1024, fileBase64);
            /* получаем имена файлов */
            img.f_320 = exports.fMd5(file320.toString('base64'));
            img.f_800 = exports.fMd5(file800.toString('base64'));
            img.f_1024 = exports.fMd5(file1024.toString('base64'));
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
        return out;
    }
}
exports.FileM = FileM;
//# sourceMappingURL=FileM.js.map