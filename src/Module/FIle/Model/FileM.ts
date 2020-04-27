const crypto = require('crypto');
import * as ImgS from './ImgS';
// Системные классы
import BaseM from '../../../System/BaseM';

// Классы SQL Запросов
import { FileSQL } from '../../../Infrastructure/SQL/Repository/FileSQL';

// Валидация
import * as V from '../Validator/FileV';

// Интерфейсы и сущьности
import { FileI } from '../../../Infrastructure/SQL/Entity/FileE';
import { ImgSQL } from '../../../Infrastructure/SQL/Repository/ImgSQL';
import { ImgI } from '../../../Infrastructure/SQL/Entity/ImgE';



export const fMd5 = (s: string): string => {
    return crypto.createHash('md5').update(s).digest("hex");;
}

/**
 * Файлы
 */
export class FileM extends BaseM {

    private fileSQL: FileSQL;
    private imgSql: ImgSQL;

    constructor(req: any) {
        super(req);

        this.fileSQL = new FileSQL(req);
        this.imgSql = new ImgSQL(req);

    }


    // =====================================

    /**
     * Добавить картику 
     * @param data 
     */
    public async addImg(data: V.saveImg.RequestI, sSaveFilePath: string): Promise<V.saveImg.ResponseI> {
        let out: V.saveImg.ResponseI = null;

        data = <V.saveImg.RequestI>V.saveImg.valid(this.req, data);

        let ok = this.errorSys.isOk();

        const fileBase64 = data.fileBase64

        const fileMd5 = fMd5(fileBase64);

        const fileName = fileMd5 + '.jpg';

        const vFile = await this.imgSql.getImgByFileName(fileMd5);

        /* TODO: добавить обрезку */
        /* TODO: добавить растаскивание по папкам */

        if (vFile) {
            out = {
                file_name: fileMd5,
            };
        } else {

            let img: ImgI = {
                file_name: fileMd5, // имя файла md5 от исходника
                f_320: '', // x320
                f_800: '',
                f_1024: '',
            }

            /* Режем картинки */
            const file320 = await ImgS.faResizeToBuffer(320, fileBase64);
            const file800 = await ImgS.faResizeToBuffer(800, fileBase64);
            const file1024 = await ImgS.faResizeToBuffer(1024, fileBase64);

            /* получаем имена файлов */
            img.f_320 = fMd5(file320.toString('base64'));
            img.f_800 = fMd5(file800.toString('base64'));
            img.f_1024 = fMd5(file1024.toString('base64'));


            await ImgS.faSaveBufferToFile(file320, sSaveFilePath + img.f_320 + '.jpg');
            await ImgS.faSaveBufferToFile(file800, sSaveFilePath + img.f_800 + '.jpg');
            await ImgS.faSaveBufferToFile(file1024, sSaveFilePath + img.f_1024 + '.jpg');


            /* вставляем файлы */
            await this.fileSQL.faInsert({
                file_name: img.f_320,
            });

            await this.fileSQL.faInsert({
                file_name: img.f_800,
            });

            await this.fileSQL.faInsert({
                file_name: img.f_1024,
            });

            /* вставляем картинку */
            await this.imgSql.faInsert(img);

        }

        return out;
    }
}
