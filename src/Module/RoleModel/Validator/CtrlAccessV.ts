
import * as Components from '@a-a-game-studio/aa-components/lib';
import { MainRequest } from '../../../Namespace/System';

import { CtrlAccessI } from '../../../Infrastructure/SQL/Entity/CtrlAccessE';

// =======================================================
/** Получить информацию о группе */
export namespace getCtrlAccessByAlias {

    /** Параметры api запроса */
    export interface RequestI {
        alias:string; // Псевдоним контроллера доступа
    }

    /** Параметры api ответа */
    export interface ResponseI {
        one_ctrl_access:CtrlAccessI; // Информация по группе
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
        // ID группы
        rules.set(rules.rule('alias')
            .type(Components.ModelRulesT.str)
            .require()
            .minLen(3)
            .maxLen(50)
            .errorEx('group_id', 'group_id')
        );

        // =======================================

        let validator =  new Components.ModelValidatorSys(req.sys.errorSys);
        validator.fValid(rules.get(), data);

        return validator.getResult();
    }
}

