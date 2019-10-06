// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';

/**
 * Описание полей группы
 */
export interface GroupI{
    id?:number;
    alias?:string;
    name?:string;
    descript?:string;
}

/**
 * Правила работы с таблицей группы
 */
export class GroupE
{
    //Имя таблицы
    public static NAME = 'aa_group';

    /**
     * Обновление ключевых записей таблицы
     */
	public getRulesInsert(){
        let rules = new Components.ModelRulesC();


        rules.set(rules.rule('alias')
            .type('text')
            .require()
            .error('alias - неверный формат')
        );

        rules.set(rules.rule('name')
            .type('text')
            .require()
            .error('name - неверный формат')
        );

        rules.set(rules.rule('descript')
            .type('text')
            .error('desc - неверный формат')
        );

        rules.set(rules.rule('type')
            .type('int')
            .error('type - неверный формат')
        );



        return rules.get();
    }

    /**
     * Обновление ключевых записей таблицы
     */
	public getRulesUpdate(){
        let rules = new Components.ModelRulesC();


        rules.set(rules.rule('alias')
            .type('text')
            .error('alias - неверный формат')
        );

        rules.set(rules.rule('name')
            .type('text')
            .error('name - неверный формат')
        );

        rules.set(rules.rule('descript')
            .type('text')
            .error('desc - неверный формат')
        );

        rules.set(rules.rule('type')
            .type('int')
            .error('type - неверный формат')
        );



        return rules.get();
    }

}
