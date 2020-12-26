"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AAComponents = __importStar(require("@a-a-game-studio/aa-components/lib"));
/* LEGO ошибок */
function InitBaseSysMiddleware(req, response, next) {
    req.sys = {
        token: '',
        errorSys: null,
        userSys: null,
        cacheSys: null,
        knexSys: null,
        logicSys: null,
        responseSys: null,
        bAuth: false,
        systemCore: null,
    };
    req.sys.errorSys = new AAComponents.ErrorSys(req.conf.common.env);
    next();
}
exports.default = InitBaseSysMiddleware;
//# sourceMappingURL=InitBaseSysMiddleware.js.map