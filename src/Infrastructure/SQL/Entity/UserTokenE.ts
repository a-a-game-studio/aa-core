
// Системные сервисы
import {UserSys} from '../../../System/UserSys';


// Компоненты
import {ModelRulesC, ModelRulesT} from '@a-a-game-studio/aa-components/lib';


export class UserTokenE
{
    //Имя таблицы
    public static NAME = 'aa_user_token';

	public getRulesInsert(){
        let rules = new ModelRulesC();

        rules.set(rules.rule('user_id')
            .type(ModelRulesT.int)
            .error(UserTokenE.NAME+'.user_id')
        );

        rules.set(rules.rule('token')
            .type(ModelRulesT.text)
            .error(UserTokenE.NAME+'.token')
        );

        return rules.get();
    }
}
