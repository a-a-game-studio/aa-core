"use strict";
/**
 * Модуль для работы с паролем и токеном
 */
Object.defineProperty(exports, "__esModule", { value: true });
const md5 = require("md5");
const uniqid = require('uniqid');
/**
 * Выдает зашифрованный пароль
 * @param pass
 * @returns hash
 */
function PassToHash(pass) {
    return md5(pass);
}
exports.PassToHash = PassToHash;
/**
 * Генерирует токен
 */
function generateToken() {
    return PassToHash(uniqid() + String(new Date()));
}
exports.generateToken = generateToken;
//# sourceMappingURL=HashFunc.js.map