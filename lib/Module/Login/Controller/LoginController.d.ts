import { BaseCtrl } from "../../../Namespace/System";
declare const router: any;
import { LoginM } from '../Model/LoginM';
/**
 * Контроллер
 */
export declare class UserController extends BaseCtrl {
    loginM: LoginM;
    /**
     * Конструктор
     *
     * @param req
     * @param res
     */
    faInit(): Promise<void>;
}
export { router };
