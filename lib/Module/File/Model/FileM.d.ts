import { ImgResizeBaseS } from '../../../Service/ImgS';
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
     * Ресайз изображений
     * незабыть переопределить
     * @param imageResizeS
     */
    fSetImageResizeS(imageResizeS: ImgResizeBaseS): void;
    /**
     * Добавить картику
     */
    addImg(data: R.uploadImg.RequestI, sSaveFilePath: string): Promise<R.uploadImg.ResponseI>;
}
