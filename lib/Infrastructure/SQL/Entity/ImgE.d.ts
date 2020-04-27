/**
 * Описание полей пользователя
 */
export interface ImgI {
    id?: number;
    file_name: string;
    f_320: string;
    f_800: string;
    f_1024: string;
}
export declare class ImgE {
    static NAME: string;
    getRulesInsert(): {
        [key: string]: any;
    };
}
