"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Подключене системных файлов для экспорта
const Controller = require("./Namespace/Controller");
exports.Controller = Controller;
// Подключене системных файлов для экспорта
const System = require("./Namespace/System");
exports.System = System;
// Подключене системных файлов
const Middleware = require("./Namespace/Middleware");
exports.Middleware = Middleware;
// Подключене SQL запросов
const SQL = require("./Namespace/SQL");
exports.SQL = SQL;
// Подключение компонентной библиотеки
const AAClasses = require("@a-a-game-studio/aa-classes/lib");
exports.AAClasses = AAClasses;
const SeoModule = require("./System/Seo");
exports.SeoModule = SeoModule;
const App_1 = require("./App");
exports.App = App_1.App;
const AppDefaultMigration_1 = require("./AppDefaultMigration");
exports.AppDefaultMigration = AppDefaultMigration_1.AppDefaultMigration;
//# sourceMappingURL=index.js.map