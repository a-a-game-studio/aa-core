import * as System from '../../../Namespace/System';
/** Сохранить данные о картинке */
export declare namespace saveImg {
    /** Параметры api запроса */
    interface RequestI {
        fileBase64: string;
    }
    /** Параметры api ответа */
    interface ResponseI {
        file_name: string;
    }
    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    function valid(req: System.MainRequest, data: any): {
        [key: string]: any;
    };
}
