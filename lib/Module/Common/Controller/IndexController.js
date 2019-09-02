"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// Подключение системных классов
const BaseCtrl_1 = require("../../../System/BaseCtrl");
var router = express.Router();
exports.router = router;
/**
 * Контроллер проверки отвечает API или нет
 */
class IndexController extends BaseCtrl_1.default {
    constructor(req) {
        super(req);
        console.log('Проверка работы API Сервера');
    }
}
/**
 * Проверка на работоспособность
 */
router.post('/post', function (req, res, next) {
    let self = new IndexController(req);
    res.send('POST API сервер работает');
});
/**
 * Проверка на работоспособность
 */
router.get('/', function (req, res, next) {
    let self = new IndexController(req);
    res.send('API сервер работает');
});
//# sourceMappingURL=IndexController.js.map