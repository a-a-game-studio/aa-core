import * as Components from '@a-a-game-studio/aa-components/lib';
import { MainRequest } from './MainRequest';
import { UserSys } from './UserSys';
/**
 * Система кеширования
 */
export declare class LogicSys {
    protected errorSys: Components.ErrorSys;
    protected userSys: UserSys;
    constructor(req: MainRequest);
    /**
     * Логический блок
     * @param sError - Сообщение об ощибке
     * @param callback - функция содержащая логическую операцию
     */
    ifOk(sError: string, callback: Function): Promise<any>;
    /**
     * задержка на нужное кол-во секунд
     * @param n
     */
    faWait(n: number): Promise<boolean>;
}
