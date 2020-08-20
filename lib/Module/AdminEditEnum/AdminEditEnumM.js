"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminEditEnumM = void 0;
// Системные классы
const BaseM_1 = __importDefault(require("../../System/BaseM"));
// Классы SQL Запросов
const EnumParamSQL_1 = require("../../Infrastructure/SQL/Repository/EnumParamSQL");
const V = __importStar(require("./AdminEditEnumV"));
const EnumSQL_1 = require("../../Infrastructure/SQL/Repository/EnumSQL");
const EnumSys_1 = require("../../System/EnumSys");
/**
 * Бизнес модель пользователя суда мы нас проксирует контроллер 1 url = 1 метод модели
 * Внутри метода делаем нужную бизнес логику
 */
class AdminEditEnumM extends BaseM_1.default {
    constructor(req) {
        super(req);
        this.enumParamSQL = new EnumParamSQL_1.EnumParamSQL(req);
        this.enumSQL = new EnumSQL_1.EnumSQL(req);
        this.enumSys = new EnumSys_1.EnumSys(req);
    }
    /**
     * Получить стартовые данные для работы страницы
     * @param data
     */
    async init(data) {
        data = V.init(this.req, data);
        let aEnumList = null;
        await this.logicSys.ifOk('Получить список enum', async () => {
            aEnumList = await this.enumSQL.listAllEnum();
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                is_init: true,
                list_enum: aEnumList // Список всех enum
            };
        });
        return out;
    }
    /**
     * Получить дерево объектов
     * @param data
     */
    async getEnumTreeType(data) {
        data = V.getEnumTreeType(this.req, data);
        let vEnumTreeType = null;
        await this.logicSys.ifOk('Получить дерево объектов', async () => {
            vEnumTreeType = await this.enumSys.faGetEnumType();
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = vEnumTreeType;
        });
        return out;
    }
    /**
     * Выбрать enumу
     * @param array data
     */
    async selectEnum(data) {
        data = V.selectEnum(this.req, data);
        let idEnum = data.id_enum;
        let vEnum = null;
        await this.logicSys.ifOk('Получить информацию по enum', async () => {
            vEnum = await this.enumSQL.oneEnumByID(idEnum);
        });
        let aEnumParam = null;
        await this.logicSys.ifOk('Получить список параметров enum', async () => {
            aEnumParam = await this.enumParamSQL.listByParam({
                id_enum: idEnum
            });
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_enum: vEnum,
                list_enum_param: aEnumParam
            };
        });
        return out;
    }
    // =======================================
    /**
     * Выбрать параметр enum
     * @param array data
     */
    async selectEnumParam(data) {
        data = V.selectEnumParam(this.req, data);
        let idEnumParam = data.id_enum_param;
        let oneEnumParam = null;
        await this.logicSys.ifOk('Получить список ролей пользователя', async () => {
            oneEnumParam = await this.enumParamSQL.oneEnumParamByID(idEnumParam);
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_enum_param: oneEnumParam
            };
        });
        return out;
    }
    /**
     * Удалить enum параметр
     * @param data
     */
    async delEnumParam(data) {
        data = V.delEnumParam(this.req, data);
        let idEnumParam = data.id_enum_param;
        let idEnum = data.id_enum;
        let bDelEnumParam = false;
        await this.logicSys.ifOk('Удалить enum параметр', async () => {
            bDelEnumParam = await this.enumParamSQL.delEnumParamByID(idEnumParam);
        });
        let aEnumParams = null;
        await this.logicSys.ifOk('Список enum параметров', async () => {
            aEnumParams = await this.enumParamSQL.listByParam({
                id_enum: idEnum
            });
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                del_enum_param_from_enum: bDelEnumParam,
                list_enum_param: aEnumParams
            };
        });
        return out;
    }
    /**
     * Добавить enum
     * @param data
     */
    async addEnum(data) {
        data = V.addEnum(this.req, data);
        let idEnum = null;
        await this.logicSys.ifOk('Добавить enum', async () => {
            idEnum = await this.enumSQL.addEnum(data);
        });
        let listEnum = null;
        await this.logicSys.ifOk('Получить список enum', async () => {
            listEnum = await this.enumSQL.listAllEnum();
        });
        let vEnum = null;
        await this.logicSys.ifOk('Получить информацию по enum', async () => {
            vEnum = await this.enumSQL.oneEnumByID(idEnum);
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                id_enum: idEnum,
                one_enum: vEnum,
                list_enum: listEnum // Список пользователей
            };
        });
        return out;
    }
    /**
     * Сохранить enumу
     * @param data данные
     */
    async saveEnum(data) {
        data = V.saveEnum(this.req, data);
        let idEnum = data.id_enum;
        let bSaveEnum = false;
        await this.logicSys.ifOk('Сохранить enum', async () => {
            bSaveEnum = await this.enumSQL.saveEnum(idEnum, data);
        });
        let vEnum = null;
        await this.logicSys.ifOk('Получить информацию по enum', async () => {
            vEnum = await this.enumSQL.oneEnumByID(idEnum);
        });
        let listEnum = null;
        await this.logicSys.ifOk('Получить список enum', async () => {
            listEnum = await this.enumSQL.listAllEnum();
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_enum: vEnum,
                list_enum: listEnum // Список пользователей
            };
        });
        return out;
    }
    /**
     * Сохранить контроллер доступа
     * @param data данные
     */
    async saveEnumParam(data) {
        data = V.saveEnumParam(this.req, data);
        let idEnumParam = data.id_enum_param;
        let bSaveEnumParam = false;
        await this.logicSys.ifOk('Сохранить enum параметр', async () => {
            bSaveEnumParam = await this.enumParamSQL.saveEnumParam(idEnumParam, data);
        });
        let vEnumParam = null;
        await this.logicSys.ifOk('Получить информацию по enum параметру', async () => {
            vEnumParam = await this.enumParamSQL.oneEnumParamByID(idEnumParam);
        });
        let listEnumParam = null;
        await this.logicSys.ifOk('Получить список enum параметры', async () => {
            listEnumParam = await this.enumParamSQL.listByParam({
                id_enum: vEnumParam.id_enum
            });
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                one_enum_param: vEnumParam,
                list_enum_param: listEnumParam // Список пользователей
            };
        });
        return out;
    }
    /**
     * Удалить enum
     * @param data
     */
    async delEnum(data) {
        data = V.delEnum(this.req, data);
        let idEnum = data.id_enum;
        let bDelEnum = false;
        await this.logicSys.ifOk('Удалить enum', async () => {
            bDelEnum = await this.enumSQL.delEnumByID(idEnum);
        });
        let listEnum = null;
        await this.logicSys.ifOk('Получить обновленный список enum', async () => {
            listEnum = await this.enumSQL.listAllEnum();
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                del_enum: bDelEnum,
                list_enum: listEnum // Список пользователей
            };
        });
        return out;
    }
    /**
     * Добавить enumу параметр
     * @param data
     */
    async addEnumParam(data) {
        data = V.addEnumParam(this.req, data);
        let idEnum = data.id_enum;
        let idGEnumParam = null;
        await this.logicSys.ifOk('Добавить enum параметр', async () => {
            idGEnumParam = await this.enumParamSQL.addEnumParam(data);
        });
        let aEnumParam = null;
        await this.logicSys.ifOk('Список enum параметров', async () => {
            aEnumParam = await this.enumParamSQL.listByParam({
                id_enum: idEnum
            });
        });
        let vEnumParam = null;
        await this.logicSys.ifOk('Получить информацию по enum параметру', async () => {
            vEnumParam = await this.enumParamSQL.oneEnumParamByID(idGEnumParam);
        });
        let out = null;
        await this.logicSys.ifOk('Формирование ответа', async () => {
            out = {
                id_enum_param: idGEnumParam,
                one_enum_param: vEnumParam,
                list_enum_param: aEnumParam // Список контроллеров
            };
        });
        return out;
    }
}
exports.AdminEditEnumM = AdminEditEnumM;
//# sourceMappingURL=AdminEditEnumM.js.map