import { System } from '../..';
/**
 * Получить Список пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function init(req: System.MainRequest, data: any): {
    [key: string]: any;
};
/**
 * Выбрать пользователя
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function selectUser(req: System.MainRequest, data: any): {
    [key: string]: any;
};
/**
 * Выбрать группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function selectGroup(req: System.MainRequest, data: any): {
    [key: string]: any;
};
/**
 * Добавить пользователя к группе
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function addUserToGroup(req: System.MainRequest, data: any): {
    [key: string]: any;
};
/**
 * Удалить пользователя из группы
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function delUserFromGroup(req: System.MainRequest, data: any): {
    [key: string]: any;
};
/**
 * Добавить пользователя
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function addUser(req: System.MainRequest, data: any): {
    [key: string]: any;
};
/**
 * Удалить пользователя
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function delUser(req: System.MainRequest, data: any): {
    [key: string]: any;
};
/**
 * Сохранить данные о пользователе
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function saveUser(req: System.MainRequest, data: any): {
    [key: string]: any;
};
