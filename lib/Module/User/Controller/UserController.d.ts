import { BaseCtrl, MainRequest } from "../../../Namespace/System";
declare const router: any;
import { UserM } from '../Model/UserM';
/**
 * Контроллер
 */
export declare class UserController extends BaseCtrl {
    static sBaseUrl: string;
    userM: UserM;
    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    static Init(req: MainRequest, res: any): Promise<UserController>;
}
export { router };
