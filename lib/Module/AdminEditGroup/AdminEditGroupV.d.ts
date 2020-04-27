import { System } from '../..';
/**
 * Получить Список пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function init(req: System.MainRequest, data: any): any;
/**
 * Выбрать группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function selectGroup(req: System.MainRequest, data: any): any;
/**
 * Выбрать контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function selectCtrlAccess(req: System.MainRequest, data: any): any;
/**
 * Добавить права группе на контроллер
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function addCtrlAccessToGroup(req: System.MainRequest, data: any): any;
/**
 * Удалить права на контроллер у группы
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function delCtrlAccessFromGroup(req: System.MainRequest, data: any): any;
/**
 * Добавить группу пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function addGroup(req: System.MainRequest, data: any): any;
/**
 * Добавить группу контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function addCtrlAccess(req: System.MainRequest, data: any): any;
/**
 * Удалить группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function delGroup(req: System.MainRequest, data: any): any;
/**
 * Сохранить данные о группе
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function saveGroup(req: System.MainRequest, data: any): any;
/**
 * Сохранить контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
export declare function saveCtrlAccess(req: System.MainRequest, data: any): any;
