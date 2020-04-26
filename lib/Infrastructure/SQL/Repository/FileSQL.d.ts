import { MainRequest } from '../../../System/MainRequest';
import BaseSQL from '../../../System/BaseSQL';
import { FileI } from '../Entity/FileE';
/**
 * Здесь методы для SQL запросов
 */
export declare class FileSQL extends BaseSQL {
    constructor(req: MainRequest);
    /**
     * Получить список пользователей
     *
     * @param integer iOffset
     * @param integer iLimit
     * @param array sSearchFIO
     * @return array|null
     */
    getFileList(iOffset: number, iLimit: number, aFilter: {
        search_Filename?: string;
    }): Promise<any>;
    /**
     * Получить пользователя по ID
     *
     * @param integer idFile
     * @return array|null
     */
    getFileByID(idFile: number): Promise<any>;
    /**
     * Получить идентификаторы пользователя по ID
     *
     * @param sToken
     */
    getFileByName(sFileName: string): Promise<FileI>;
    /**
     * Вставка файла
     * @param data
     */
    faInsert(data: FileI): Promise<number>;
}
