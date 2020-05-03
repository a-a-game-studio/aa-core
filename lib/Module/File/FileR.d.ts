/** Модуль для загрузки файлов */
export declare namespace FileR {
    /** Загрузить картинку в файловое хранилище */
    namespace uploadImg {
        /** APIURL */
        const route = "/file/upload-img";
        /** Alias действия */
        const action = "upload-img";
        /** Параметры api запроса */
        interface RequestI {
            fileBase64: string;
        }
        /** Параметры api ответа */
        interface ResponseI {
            file_name: string;
        }
    }
}
