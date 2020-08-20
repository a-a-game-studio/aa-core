import { MainRequest, ConfI, TError } from './MainRequest';
import { Seo } from './Seo';
import { UserI } from '../Infrastructure/SQL/Entity/UserE';
import * as express from 'express';
/**
 * Системный сервис формирования ответа
 */
export declare class ResponseSys {
    private env;
    private ifDevMode;
    protected sTpl: string;
    protected tError: TError;
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
    /**
     * Установить шаблон рендера для faResponseStatic
     * @param sTpl
     */
    fSetTpl(sTpl: string): ResponseSys;
    /**
     * тип ошибки в случае неудачи faResponseStatic
     * @param sTpl
     */
    fSetTError(tError: TError): ResponseSys;
    /**
     * Функция рендера страницы
     * @param faCallback - функция контролера
     * @param tpl - путь к шаблону hbs
     * ПОМНИТЕ об fSetTpl и fSetTError
     */
    faResponseStatic(faCallback: Function): Promise<(req: MainRequest, res: express.Response, next: any) => Promise<void>>;
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
/**
 * Функция рендера страницы
 * @param faCallback - функция контролера
 * @param tpl - путь к шаблону hbs
 */
export declare const faResponseStatic: (tpl: string, tError: TError, faCallback: Function) => (req: MainRequest, res: express.Response, next: any) => Promise<void>;
