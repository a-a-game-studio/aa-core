import BaseM from '../../../System/BaseM';
import { FileR as R } from '../FileR';
export declare const fMd5: (s: string) => string;
/**
 * Файлы
 */
export declare class FileM extends BaseM {
    private fileSQL;
    private imgSql;
    private imgS;
    constructor(req: any);
    /**
     * Добавить картику
     */
    addImg(data: R.uploadImg.RequestI, sSaveFilePath: string): Promise<R.uploadImg.ResponseI>;
}
