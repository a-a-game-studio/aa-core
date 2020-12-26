"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.App = App_1.App;
const AppDefaultMigration_1 = require("./AppDefaultMigration");
exports.AppDefaultMigration = AppDefaultMigration_1.AppDefaultMigration;
//# sourceMappingURL=index.js.map