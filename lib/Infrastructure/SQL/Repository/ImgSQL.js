"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseSQL_1 = __importDefault(require("../../../System/BaseSQL"));
const ImgE_1 = require("../Entity/ImgE");
/**
 * Здесь методы для SQL запросов
 */
class ImgSQL extends BaseSQL_1.default {
    constructor(req) {
        super(req);
    }
    /**
     * получит картинку по md5 файла
     * @param sToken
     */
    async getImgByFileName(sFileName) {
        let ok = this.errorSys.isOk();
        let resp = null;
        let sql = '';
        // Декларация ошибок
        this.errorSys.declare([
            'get_Img'
        ]);
        sql = `
            SELECT
                *
            FROM ${ImgE_1.ImgE.NAME} f
            WHERE f.file_name = :sFileName
            LIMIT 1
        `;
        try {
            resp = (await this.db.raw(sql, {
                'sFileName': sFileName
            }))[0][0];
        }
        catch (e) {
            ok = false;
            this.errorSys.errorEx(e, 'getImgByFileName', 'Не удалось получить sFileName');
        }
        return resp;
    }
    // ========================================
    // =================================
    // INSERT
    // =================================
    /**
     * Вставка файла
     * @param data
     */
    async faInsert(data) {
        let idImg;
        let imgE = new ImgE_1.ImgE();
        try {
            // Валидируем входящие данные
            if (!this.modelValidatorSys.fValid(imgE.getRulesInsert(), data)) {
                throw 'validation error';
            }
            idImg = (await this.db(ImgE_1.ImgE.NAME)
                .insert(this.modelValidatorSys.getResult()))[0];
        }
        catch (e) {
            this.errorSys.error('insert_img', 'Ошибка добавления картинки');
        }
        return idImg;
    }
}
exports.ImgSQL = ImgSQL;
//# sourceMappingURL=ImgSQL.js.map