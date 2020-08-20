"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessGroupE = void 0;
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
const lib_2 = require("@a-a-game-studio/aa-components/lib");
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
            .type(lib_2.ModelRulesT.boolean)
            .error('create_access - неверный формат'));
        rules.set(rules.rule('read_access')
            .type(lib_2.ModelRulesT.boolean)
            .error('read_access - неверный формат'));
        rules.set(rules.rule('update_access')
            .type(lib_2.ModelRulesT.boolean)
            .error('update_access - неверный формат'));
        rules.set(rules.rule('delete_access')
            .type(lib_2.ModelRulesT.boolean)
            .error('delete_access - неверный формат'));
        return rules.get();
    }
    /**
     *  Правила создания записей в таблице
     */
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('id_group')
            .type(lib_2.ModelRulesT.int)
            .error('id_group - неверный формат'));
        rules.set(rules.rule('id_ctrl_access')
            .type(lib_2.ModelRulesT.int)
            .error('id_ctrl_access - неверный формат'));
        return rules.get();
    }
}
exports.AccessGroupE = AccessGroupE;
//Имя таблицы
AccessGroupE.NAME = 'aa_access_group';
//# sourceMappingURL=AccessGroupE.js.map