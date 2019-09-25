/**
 * Модуль для работы с паролем и токеном
 */
/**
 * Выдает зашифрованный пароль
 * @param pass
 * @returns hash
 */
export declare function PassToHash(pass: string): string;
/**
 * Генерирует токен
 */
export declare function generateToken(): string;
