

// Компоненты
import {ModelRulesC, ModelRulesT} from '@a-a-game-studio/aa-components/lib';


export class UserSmsCodeE
{
    //Имя таблицы
    public static NAME = 'aa_user_sms_code';

	public getRulesInsert(){
        let rules = new ModelRulesC();

        rules.set(rules.rule('user_id')
            .type(ModelRulesT.int)
            .error(UserSmsCodeE.NAME+'.user_id')
        );

        rules.set(rules.rule('code')
            .type(ModelRulesT.text)
            .error(UserSmsCodeE.NAME+'.code')
        );

        return rules.get();
    }
}
