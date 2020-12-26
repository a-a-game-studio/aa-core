"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// Подключение системных классов
const BaseCtrl_1 = __importDefault(require("../../../System/BaseCtrl"));
var router = express.Router();
exports.router = router;
/**
 * Контроллер проверки отвечает API или нет
 */
class IndexController extends BaseCtrl_1.default {
}
/**
 * Проверка на работоспособность
 */
router.post('/aa/', function (req, res, next) {
    let self = new IndexController(req, res);
    res.send('POST API сервер работает');
});
/**
 * Проверка на работоспособность
 */
router.get('/aa/', function (req, res, next) {
    let self = new IndexController(req, res);
    res.send('API сервер работает');
});
//# sourceMappingURL=IndexController.js.map