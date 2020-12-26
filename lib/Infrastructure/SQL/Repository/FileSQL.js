"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseSQL_1 = __importDefault(require("../../../System/BaseSQL"));
const FileE_1 = require("../Entity/FileE");
/**
 * Здесь методы для SQL запросов
 */
class FileSQL extends BaseSQL_1.default {
    constructor(req) {
        super(req);
    }
    /**
     * Получить список пользователей
     *
     * @param integer iOffset
     * @param integer iLimit
     * @param array sSearchFIO
     * @return array|null
     */
    async getFileList(iOffset, iLimit, aFilter) {
        let ok = this.errorSys.isOk();
        let sql = '';
        // Декларирование ошибок
        this.errorSys.declare([
            'get_File' // получение пользователей
        ]);
        let sSearchFileName = "";
        if (aFilter.search_Filename) {
            sSearchFileName = aFilter.search_Filename;
        }
        let bSearchFileName = false; // Использовать поиск по имени или нет
        if (sSearchFileName) {
            bSearchFileName = true;
        }
        let resp = null;
        if (ok) {
            sql = `
                SELECT
                   *
                FROM ${FileE_1.FileE.NAME} f
                WHERE
                    CASE WHEN :if_search_Filename THEN f.file_name LIKE :search_Filename ELSE true END
             
                ORDER BY f.id DESC
                LIMIT :limit
                OFFSET :offset
                ;
            `;
            try {
                resp = (await this.db.raw(sql, {
                    'offset': iOffset,
                    'limit': iLimit,
                    'if_search_Filename': bSearchFileName,
                }))[0];
            }
            catch (e) {
                ok = false;
                this.errorSys.errorEx(e, 'get_File', 'Не удалось получить file');
            }
        }
        return resp;
    }
    /**
     * Получить пользователя по ID
     *
     * @param integer idFile
     * @return array|null
     */
    async getFileByID(idFile) {
        let ok = this.errorSys.isOk();
        let resp = null;
        let sql = '';
        // Декларация ошибок
        this.errorSys.declare([
            'get_File'
        ]);
        sql = `
            SELECT
               *
            FROM ${FileE_1.FileE.NAME} f
            WHERE f.id = :id_File
            LIMIT 1
        `;
        try {
            resp = (await this.db.raw(sql, {
                'id_File': idFile
            }))[0][0];
        }
        catch (e) {
            ok = false;
            this.errorSys.errorEx(e, 'get_File', 'Не удалось получить file');
        }
        return resp;
    }
    /**
     * Получить идентификаторы пользователя по ID
     *
     * @param sToken
     */
    async getFileByName(sFileName) {
        let ok = this.errorSys.isOk();
        let resp = null;
        let sql = '';
        // Декларация ошибок
        this.errorSys.declare([
            'get_File'
        ]);
        sql = `
            SELECT
                *
            FROM ${FileE_1.FileE.NAME} f
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
            this.errorSys.errorEx(e, 'getFileByName', 'Не удалось получить sFileName');
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
        let idFile;
        let fileE = new FileE_1.FileE();
        try {
            // Валидируем входящие данные
            if (!this.modelValidatorSys.fValid(fileE.getRulesInsert(), data)) {
                throw 'validation error';
            }
            idFile = (await this.db(FileE_1.FileE.NAME)
                .insert(this.modelValidatorSys.getResult()))[0];
        }
        catch (e) {
            this.errorSys.error('insert_file', 'Ошибка добавления файла');
        }
        return idFile;
    }
}
exports.FileSQL = FileSQL;
//# sourceMappingURL=FileSQL.js.map