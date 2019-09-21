import { MainRequest } from './MainRequest';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
/**
 * Клас который глобально знает все данные пользователя
 */
export declare class UserSys extends AAClasses.UserModule.User {
    idUser: number;
    private token;
    private userInfoList;
    private userGroupsList;
    private ctrlAccessList;
    private aliasCtrlAccess;
    private idCtrlAccess;
    private accessCRUDList;
    private req;
    private userSQL;
    private userGroupSQL;
    private accessGroupSQL;
    private ctrlAccessSQL;
    constructor(req: MainRequest, listDB: AAClasses.SysteCoreModule.ListDB);
    /**
     * Инициализация данных пользователя
     * тольrо если this.isAuth() == true
     *
     * @return void
     */
    init(): Promise<void>;
    /**
     * Получения доступа на контроллер
     *
     * @param string alias
     * @return boolean
     */
    isAccessCtrl(alias: string): Promise<boolean>;
    /**
     * Доступ на CRUD
     * - Создание
     *
     * @return boolean
     */
    isAccessCreate(): boolean;
    /**
     * Доступ на CRUD
     * - Чтение
     *
     * @return boolean
     */
    isAccessRead(): boolean;
    /**
     * Доступ на CRUD
     * - Обновление
     *
     * @return boolean
     */
    isAccessUpdate(): boolean;
    /**
     * Доступ на CRUD
     * - Удаление
     *
     * @return boolean
     */
    isAccessDelete(): boolean;
    /**
     * Проверка является ли пользователь администратором
     *
     * @return boolean
     */
    isAdmin(): boolean;
    /**
     * Проверка является ли пользователь авторизированным
     */
    isAuth(): Promise<boolean>;
    /**
     * возвращает token
     *
     * @return string|null
     */
    fGetApikey(): string;
    /**
     * Получить ID пользователя
     */
    getIdUser(): number;
}
