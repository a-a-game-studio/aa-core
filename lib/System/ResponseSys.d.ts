import { MainRequest, ConfI } from './MainRequest';
import { Seo } from './Seo';
import { UserI } from '../Infrastructure/SQL/Entity/UserE';
/**
 * Системный сервис формирования ответа
 */
export declare class ResponseSys {
    private env;
    private ifDevMode;
    private errorSys;
    constructor(req: MainRequest);
    /**
     * Формирование ответа клиенту
     *
     * @param array|null data
     * @param string sMsg
     * @return array
     */
    response(data: any, sMsg: string): any;
}
/**
 * Ответ в шаблон страницы
 * эти переменные используются в шаблоне
 */
export interface ResponseI {
    seo: Seo;
    route: string;
    data: any;
    config: ConfI;
    userInfo: UserI;
    bAuth: boolean;
    bIsAdmin: boolean;
    layout?: (boolean | string);
    bIsProd?: boolean;
    sRefer: string;
}
/**
 * Функиця формирующая данные для шаблона
 * Ответ в шаблон страницы
 * эти переменные используются в шаблоне
 * @param req
 * @param data
 */
export declare const fResponse: (req: MainRequest, data: any) => ResponseI;
export declare const fGetRoutePath: (req: any) => string;
