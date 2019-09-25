// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';



export class UserGroupE
{
    //Имя таблицы
    public static NAME = 'aa_user_group';

	public getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('user_id')
            .type(Components.ModelRulesT.int)
            .error(UserGroupE.NAME+'.user_id')
        );

        rules.set(rules.rule('group_id')
            .type(Components.ModelRulesT.int)
            .error(UserGroupE.NAME+'.group_id')
        );

        return rules.get();
    }
}
