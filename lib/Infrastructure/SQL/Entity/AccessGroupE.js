"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
/**
 * Сущьность доступа группе пользователей
 */
class AccessGroupE {
    /**
     * Обновление ключевых записей таблицы
     */
    getRulesUpdate() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('create_access')
            .type('boolean')
            .error('create_access - неверный формат'));
        rules.set(rules.rule('read_access')
            .type('boolean')
            .error('read_access - неверный формат'));
        rules.set(rules.rule('update_access')
            .type('boolean')
            .error('update_access - неверный формат'));
        rules.set(rules.rule('delete_access')
            .type('boolean')
            .error('delete_access - неверный формат'));
        return rules.get();
    }
    /**
     *  Правила создания записей в таблице
     */
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('id_group')
            .type('int')
            .error('id_group - неверный формат'));
        rules.set(rules.rule('id_ctrl_access')
            .type('int')
            .error('id_ctrl_access - неверный формат'));
        return rules.get();
    }
}
//Имя таблицы
AccessGroupE.NAME = 'aa_access_group';
exports.AccessGroupE = AccessGroupE;
//# sourceMappingURL=AccessGroupE.js.map