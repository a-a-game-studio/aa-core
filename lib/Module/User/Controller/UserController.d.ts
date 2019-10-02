import { BaseCtrl, MainRequest } from "../../../Namespace/System";
import { User } from "@a-a-game-studio/aa-classes/lib/User/User";
declare const router: any;
/**
 * Контроллер
 */
export declare class UserController extends BaseCtrl {
    static sBaseUrl: string;
    protected user: User;
    constructor(req: MainRequest.MainRequest, resp: any);
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
export { router };
