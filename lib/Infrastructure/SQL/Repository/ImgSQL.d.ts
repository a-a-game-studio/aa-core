import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { ImgI } from '../Entity/ImgE';
/**
 * Здесь методы для SQL запросов
 */
export declare class ImgSQL extends BaseSQL {
    constructor(req: MainRequest);
    /**
     * получит картинку по md5 файла
     * @param sToken
     */
    getImgByFileName(sFileName: string): Promise<ImgI>;
    /**
     * Вставка файла
     * @param data
     */
    faInsert(data: ImgI): Promise<number>;
}
