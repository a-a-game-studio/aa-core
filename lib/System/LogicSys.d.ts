import * as Components from '@a-a-game-studio/aa-components/lib';
import { MainRequest } from './MainRequest';
import { UserSys } from './UserSys';
import { ModelRulesC } from '@a-a-game-studio/aa-components/lib';
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
     * Блок для валидации входных данных
     * Выбрасывает ошибку в случае не правильности данных
     */
    fValidData<RequestT>(vModelRules: ModelRulesC, data: RequestT): RequestT;
    /**
     * задержка на нужное кол-во секунд
     * @param n
     */
    faWait(n: number): Promise<boolean>;
}
