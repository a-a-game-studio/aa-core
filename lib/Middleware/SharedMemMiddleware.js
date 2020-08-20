"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedMemMiddleware = void 0;
const lib_1 = require("@a-a-game-studio/aa-redis-sys/lib");
/**
 * Поключенеи к SharedMemSys
 * возвращает ф-ю middleware
 * @param globalMem  - общая переменная в памяти. Лежит вне модулей
 *
 * пример использованя:
 * const globalMem:MemSysI = {};
 * objExpress.use(SharedMemMiddleware(globalMem));
 */
exports.SharedMemMiddleware = (globalMem) => {
    /**
     * @param req
     * @param res
     * @param next
     */
    return (req, res, next) => {
        if (req.sys.errorSys.isOk()) {
            console.log('SharedMemSys connection...');
            req.infrastructure.redis = new lib_1.SharedMemSys.SharedMemSys(globalMem);
        }
        console.log('connection SharedMemSys complete;');
        next();
    };
};
//# sourceMappingURL=SharedMemMiddleware.js.map