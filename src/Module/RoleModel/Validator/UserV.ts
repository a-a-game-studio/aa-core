
import * as Components from '@a-a-game-studio/aa-components/lib';
import { UserI } from '../../../Infrastructure/SQL/Entity/UserE';
import { MainRequest } from '../../../Namespace/System';

// =======================================================
/** Получить Список пользователей */
export namespace getUserList {

    /** Параметры api запроса */
    export interface RequestI {
        offset:number; // С какой записи получать данные
        limit:number; // Сколько записей получать
        search_fullname?:string; // Поиск По ФИО
        search_username?:string; // Поиск по Имени пользователя
    }

    /** Параметры api ответа */
    export interface ResponseI {
        list:{ // Списки
            user:UserI[];
        };
    }

    /**
     * Валидация
     *
     * @param req MainRequest
     * @param data RequestI
     */
    export function valid(req:MainRequest, data:any){
        let rules = new Components.ModelRulesC();

        // =======================================

        // Проверка с какой записи получать данные
        rules.set(rules.rule('offset')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .errorEx('offset', 'offset')
        );

        // Сколько записей получать
        rules.set(rules.rule('limit')
            .type(Components.ModelRulesT.int)
            .require()
            .moreOrEq(0)
            .lessOrEq(100)
            .errorEx('limit', 'limit')
        );

        // =======================================

        let validator =  new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}
