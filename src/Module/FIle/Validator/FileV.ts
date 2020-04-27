import * as Components from '@a-a-game-studio/aa-components/lib';
import * as System from '../../../Namespace/System';


/** Сохранить данные о картинке */
export namespace saveImg {

    /** Параметры api запроса */
    export interface RequestI {
        fileBase64: string; // файл для загрузки
    }

    /** Параметры api ответа */
    export interface ResponseI {
        file_name: string; // md5 содержимого
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req: System.MainRequest, data: any) {
        let rules = new Components.ModelRulesC();

        // =======================================

        // логин
        rules.set(rules.rule('fileBase64')
            .type(Components.ModelRulesT.text)
            .require()
            .errorEx('fileBase64', 'fileBase64')
        );

        // =======================================

        let validator = new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}
