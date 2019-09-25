/**
 * Модуль для работы с паролем и токеном
 */

const md5 = require("md5");
const uniqid = require('uniqid');
/**
 * Выдает зашифрованный пароль
 * @param pass 
 * @returns hash
 */
export function PassToHash(pass: string): string {
    return md5(pass);
}


/**
 * Генерирует токен
 */
export function generateToken(): string {
    return PassToHash(uniqid() + String(new Date()));
}