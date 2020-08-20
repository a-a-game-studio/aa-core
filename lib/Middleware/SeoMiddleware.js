"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Seo_1 = require("../System/Seo");
/**
 * Подключение модля seo
 * @param req
 * @param response
 * @param next
 */
function SeoMiddleware(req, response, next) {
    req.seo = new Seo_1.Seo();
    next();
}
exports.default = SeoMiddleware;
//# sourceMappingURL=SeoMiddleware.js.map