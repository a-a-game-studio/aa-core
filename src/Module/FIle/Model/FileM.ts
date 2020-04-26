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



export const fMd5 = (s: string): string => {
    return crypto.createHash('md5').update(s).digest("hex");;
}

/**
 * Файлы
 */
export class FileM extends BaseM {

    private fileSQL: FileSQL;

    constructor(req: any) {
        super(req);

        this.fileSQL = new FileSQL(req);

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

        const vFile = await this.fileSQL.getFileByName(fileMd5);

        /* TODO: добавить обрезку */
        /* TODO: добавить растаскивание по папкам */

        if (vFile) {
            out = {
                file_name: fileMd5,
            };
        } else {

            await ImgS.faSaveBase64ToFile(fileBase64, `${sSaveFilePath}/${fileName}`);

            await this.fileSQL.faInsert({
                file_name: fileMd5,
            })

        }


        return out;
    }
}
