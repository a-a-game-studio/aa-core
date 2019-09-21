import { BaseCtrl } from "../../Namespace/System";
declare const router: any;
/**
 * Контроллер
 */
export declare class UserController extends BaseCtrl {
    static sBaseUrl: string;
    /**
     * index page
     */
    Index(): Promise<void>;
    /**
     * Ифнормация об пользователе
     */
    getUserInfo(): Promise<void>;
    /**
     * Регистрация по логину и паролю
     * @param login
     * @param pass
     * @param passConfirm
     *
     * @returns token: string
     */
    registerByLoginAndPass(): Promise<void>;
    update(): Promise<void>;
}
export default router;
