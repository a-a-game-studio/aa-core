/// <reference types="node" />
import { BaseM } from '../Namespace/System';
/**
 * Сервис автоматизаций по работе с картинками
 */
export declare class ImgS extends BaseM {
    /**
     * Сохранить Base64 строку в файл
     * @param base64Image
     * @param sFile
     */
    faSaveBase64ToFile(base64Image: string, sFile: string): Promise<unknown>;
    /**
     * Сохранить из буфера в файл
     * @param img
     * @param sFile
     */
    faSaveBufferToFile(img: Buffer, sFile: string): Promise<unknown>;
    /**
     * Картинка base64 в Buffer
     * @param sDataBase64
     */
    fImgBase64ToBuffer(sDataBase64: string): Buffer;
    /**
     * Вырезает лишнее из строки Base64
     * @param sBase64
     */
    fGetBase64Str(sBase64: string): string;
    /**
     * Изменить размер картинки и сохранить в файл
     * @param width
     * @param file
     */
    faResizeToBuffer(width: number, sDataBase64: any): Promise<Buffer>;
}
