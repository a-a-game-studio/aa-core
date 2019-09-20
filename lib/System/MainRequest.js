"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Подключение компонентной библиотеки
const Components = require("@a-a-game-studio/aa-components/lib");
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
    mainRequest.sys.errorSys = new Components.ErrorSys(conf.env);
    mainRequest.seo = new Seo_1.Seo();
    return mainRequest;
}
exports.initMainRequest = initMainRequest;
//# sourceMappingURL=MainRequest.js.map