"use strict";
/**
 * Модуль для работы с паролем и токеном
 */
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid = require('uniqid');
const uuidv4 = require('uuid/v4');
var md5 = require('md5');
/**
 * Выдает зашифрованный пароль
 * @param pass
 * @returns hash
 */
function fPassToHash(pass) {
    return md5(pass);
}
exports.fPassToHash = fPassToHash;
/**
 * Генерирует токен
 */
function fGenerateToken() {
    return uniqid(uuidv4() + '-');
}
exports.fGenerateToken = fGenerateToken;
//# sourceMappingURL=HashFunc.js.map