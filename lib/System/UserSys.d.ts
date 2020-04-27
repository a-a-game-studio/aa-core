import { MainRequest } from './MainRequest';
import { UserI } from '../Infrastructure/SQL/Entity/UserE';
/**
 * Клас который глобально знает все данные пользователя
 */
export declare class UserSys {
    idUser: number;
    private bAuth;
    private token;
    userInfo: UserI;
    private userGroupsList;
    private ctrlAccessList;
    private aliasCtrlAccess;
    private idCtrlAccess;
    private accessCRUDList;
    private req;
    private errorSys;
    private userSQL;
    private userTokenSQL;
    private userGroupSQL;
    private accessGroupSQL;
    private ctrlAccessSQL;
    constructor(req: MainRequest);
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
     * Получить статус авторизирован пользователь или нет
     */
    ifAuth(): boolean;
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
