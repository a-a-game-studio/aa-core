/**
 * Модуль для работы с паролем и токеном
 */
/**
 * Выдает зашифрованный пароль
 * @param pass
 * @returns hash
 */
export declare function fPassToHash(pass: string): string;
/**
 * Генерирует токен
 */
export declare function fGenerateToken(): string;
