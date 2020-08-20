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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDefaultMigration = exports.App = exports.SeoModule = exports.Middleware = exports.AAClasses = exports.System = exports.SQL = exports.Controller = void 0;
// Подключене системных файлов для экспорта
const Controller = __importStar(require("./Namespace/Controller"));
exports.Controller = Controller;
// Подключене системных файлов для экспорта
const System = __importStar(require("./Namespace/System"));
exports.System = System;
// Подключене системных файлов
const Middleware = __importStar(require("./Namespace/Middleware"));
exports.Middleware = Middleware;
// Подключене SQL запросов
const SQL = __importStar(require("./Namespace/SQL"));
exports.SQL = SQL;
// Подключение компонентной библиотеки
const AAClasses = __importStar(require("@a-a-game-studio/aa-classes/lib"));
exports.AAClasses = AAClasses;
const SeoModule = __importStar(require("./System/Seo"));
exports.SeoModule = SeoModule;
const App_1 = require("./App");
Object.defineProperty(exports, "App", { enumerable: true, get: function () { return App_1.App; } });
const AppDefaultMigration_1 = require("./AppDefaultMigration");
Object.defineProperty(exports, "AppDefaultMigration", { enumerable: true, get: function () { return AppDefaultMigration_1.AppDefaultMigration; } });
//# sourceMappingURL=index.js.map