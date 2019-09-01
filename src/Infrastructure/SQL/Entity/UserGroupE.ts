
// Системные сервисы
import {UserSys} from '../../../System/UserSys';


// Компоненты
import {ModelRulesC, ModelRulesT} from '@a-a-game-studio/aa-components/lib';


export class UserGroupE
{
    //Имя таблицы
    public static NAME = 'aa_user_group';

	public getRulesInsert(){
        let rules = new ModelRulesC();

        rules.set(rules.rule('user_id')
            .type(ModelRulesT.int)
            .error(UserGroupE.NAME+'.user_id')
        );

        rules.set(rules.rule('group_id')
            .type(ModelRulesT.int)
            .error(UserGroupE.NAME+'.group_id')
        );

        return rules.get();
    }
}
