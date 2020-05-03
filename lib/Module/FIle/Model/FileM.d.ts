import BaseM from '../../../System/BaseM';
import * as V from '../Validator/FileV';
export declare const fMd5: (s: string) => string;
/**
 * Файлы
 */
export declare class FileM extends BaseM {
    private fileSQL;
    private imgSql;
    constructor(req: any);
    /**
     * Добавить картику
     * @param data
     */
    addImg(data: V.saveImg.RequestI, sSaveFilePath: string): Promise<V.saveImg.ResponseI>;
}
