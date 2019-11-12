"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MainConfig_1 = __importDefault(require("./Config/MainConfig"));
const MainRequest_1 = require("./System/MainRequest");
const EnumSys_1 = require("./System/EnumSys");
const LogicSys_1 = require("./System/LogicSys");
process.env.tsconfig = '../tsconfig.json';
// =========================
// Файл для генерации Enum типов(дерево типов)
// =========================
// =========================
// Подключение middleware
// =========================
const middleware = __importStar(require("./Namespace/Middleware"));
function fVoid() { }
;
// Инициализация конфига
const req = MainRequest_1.initMainRequest(MainConfig_1.default);
async function initSys() {
    /* Инициализация базовых систем */
    await middleware.InitBaseSysMiddleware(req, fVoid, fVoid);
    /** Конфигурирование приложения */
    await middleware.ConfigMiddleware(req, fVoid, fVoid);
}
async function run() {
    await initSys();
    let logicSys = new LogicSys_1.LogicSys(req);
    let enumSys = new EnumSys_1.EnumSys(req);
    await enumSys.faSaveEnumType('./src/Config/Enum.json');
}
;
run();
//# sourceMappingURL=en.js.map