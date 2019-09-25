// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';


export class UserTokenE
{
    //Имя таблицы
    public static NAME = 'aa_user_token';

	public getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .error(UserTokenE.NAME+'.user_id')
        );

        rules.set(rules.rule('token')
            .type(Components.ModelRulesT.text)
            .error(UserTokenE.NAME+'.token')
        );

        return rules.get();
    }
}
