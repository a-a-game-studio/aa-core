"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Подключение компонентной библиотеки
const AAClasses = __importStar(require("@a-a-game-studio/aa-classes/lib"));
const Seo_1 = require("./Seo");
;
/**
 * Инициализация MainRequest для консольных запросов
 */
function initMainRequest(conf) {
    let mainRequest = {
        headers: null,
        sys: {
            token: '',
            bAuth: false,
            errorSys: null,
            userSys: null,
            responseSys: null,
            aaQuerySys: null
        },
        conf: null,
        infrastructure: {
            mysql: null,
            redis: null,
            rabbit: null,
        }
    };
    mainRequest.conf = conf;
    mainRequest.sys.errorSys = new AAClasses.Components.ErrorSys(conf.env);
    mainRequest.seo = new Seo_1.Seo();
    return mainRequest;
}
exports.initMainRequest = initMainRequest;
//# sourceMappingURL=MainRequest.js.map