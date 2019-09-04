
// Системные сервисы
import {UserSys} from '../../../System/UserSys';

// Компоненты
import {ModelRulesC} from '@a-a-game-studio/aa-components/lib';


/**
 * Описание полей группы
 */
export interface AccessGroupI{
	id?:number; // ID доступа
	group_id?:number; //ID группы
	ctrl_access_id?:number; // ID контроллера
	create_access?:boolean; // Права на создание
	read_access?:boolean; // Права на чтение
	update_access?:boolean; // Права на обновление
	delete_access?:boolean; // Права на удаление
}

/**
 * Сущьность доступа группе пользователей
 */
export class AccessGroupE
{
    //Имя таблицы
    public static NAME = 'aa_access_group';

    /**
     * Обновление ключевых записей таблицы
     */
	public getRulesUpdate(){
        let rules = new ModelRulesC();


        rules.set(rules.rule('create_access')
            .type('boolean')
            .error('create_access - неверный формат')
        );

        rules.set(rules.rule('read_access')
            .type('boolean')
            .error('read_access - неверный формат')
        );

        rules.set(rules.rule('update_access')
            .type('boolean')
            .error('update_access - неверный формат')
        );

        rules.set(rules.rule('delete_access')
            .type('boolean')
            .error('delete_access - неверный формат')
        );

        return rules.get();
    }

    /**
     *  Правила создания записей в таблице
     */
	public getRulesInsert(){
        let rules = new ModelRulesC();

        rules.set(rules.rule('group_id')
            .type('int')
            .error('group_id - неверный формат')
        );

        rules.set(rules.rule('ctrl_access_id')
            .type('int')
            .error('ctrl_access_id - неверный формат')
        );

        return rules.get();
    }

}
