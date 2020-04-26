// Компоненты
import { Components } from '@a-a-game-studio/aa-classes/lib';


/**
 * Описание полей пользователя
 */
export interface ImgI {
    id?: number;
    f_320?: string;
    f_800?: string;
    f_1024?: string;
}


export class ImgE {
    //Имя таблицы
    public static NAME = 'aa_img';

    public getRulesInsert() {
        let rules = new Components.ModelRulesC();

        rules.set(rules.rule('f_320')
            .type('text')
            .require()
            .error('f_320 - неверный формат')
        );     

        rules.set(rules.rule('f_800')
            .type('text')
            .require()
            .error('f_800 - неверный формат')
        );     

        rules.set(rules.rule('f_1024')
            .type('text')
            .require()
            .error('f_1024 - неверный формат')
        );     

        return rules.get();
    }

   
}
