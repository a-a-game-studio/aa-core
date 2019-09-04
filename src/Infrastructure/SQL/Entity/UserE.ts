
// Системные сервисы
import {UserSys} from '../../../System/UserSys';


// Компоненты
import {ModelRulesC} from '@a-a-game-studio/aa-components/lib';

/**
 * Описание полей пользователя
 */
export interface UserI{
    id?:number;
    login?:string;
    name?:string;
    email?:string;
}


export class UserE
{
    //Имя таблицы
    public static NAME = 'aa_user';

	public getRulesInsert(){
        let rules = new ModelRulesC();

        rules.set(rules.rule('login')
            .type('text')
            .error('user_email - неверный формат')
        );

        rules.set(rules.rule('name')
            .type('text')
            .error('name - неверный формат')
        );

        rules.set(rules.rule('email')
            .type('text')
            .error('user_email - неверный формат')
        );

        rules.set(rules.rule('pswd')
            .type('text')
            .error('pswd - неверный формат')
        );

        

        return rules.get();
    }

}
