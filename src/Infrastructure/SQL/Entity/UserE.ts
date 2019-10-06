// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';

/**
 * Описание идентификаторов и связей пользователя
 */
export interface UserIDs{
    user_id?:number;
    login?:string;
    name?:string;
    email?:string;
    phone?: string;
    token?:string;
}


/**
 * Описание полей пользователя
 */
export interface UserI{
    id?:number;
    login?:string;
    name?:string;
    surname?: string;
    patronymic?: string;
    email?:string;
    phone?: string;
    pswd?: string;
    hash?: string;
}


export class UserE
{
    //Имя таблицы
    public static NAME = 'aa_user';

	public getRulesInsert(){
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('login')
            .type('text')
            .require()
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
            .require()
            .error('pswd - неверный формат')
        );

        return rules.get();
    }

    /** Правила обновления таблицы */
    public getRulesUpdate(){

        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('email')
            .typeText()
            .error(UserE.NAME + ' - email')
        );

        rules.set(rules.rule('name')
            .typeText()
            .error(UserE.NAME + ' - name')
        );

        rules.set(rules.rule('surname')
            .typeText()
            .error(UserE.NAME + ' - surname')
        );
        
        rules.set(rules.rule('patronymic')
            .typeText()
            .error(UserE.NAME + ' - surname')
        );

        return rules.get();
    }

    /** Правила обновления таблицы */
    public getRulesChangePswd(){

        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('pswd')
            .typeText()
            .error(UserE.NAME + ' - email')
        );

        return rules.get();
    }
}
