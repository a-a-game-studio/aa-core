"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
let conf;
const app = new App_1.App(conf)
    .fDisableCors() // отключаем cors
    .fUseBodyParser() // используем дефолтный BodyParser
    .fStart(); // Запускаем приложение
//# sourceMappingURL=App.sample.js.map