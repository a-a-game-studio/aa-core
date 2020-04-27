"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
const lib_2 = require("@a-a-game-studio/aa-components/lib");
/**
 * Правила работы с таблицей группы
 */
class GroupE {
    /**
     * Обновление ключевых записей таблицы
     */
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('alias')
            .type(lib_2.ModelRulesT.text)
            .require()
            .error('alias - неверный формат'));
        rules.set(rules.rule('name')
            .type(lib_2.ModelRulesT.text)
            .require()
            .error('name - неверный формат'));
        rules.set(rules.rule('descript')
            .type(lib_2.ModelRulesT.text)
            .error('desc - неверный формат'));
        rules.set(rules.rule('type')
            .type(lib_2.ModelRulesT.int)
            .error('type - неверный формат'));
        return rules.get();
    }
    /**
     * Обновление ключевых записей таблицы
     */
    getRulesUpdate() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('alias')
            .type(lib_2.ModelRulesT.text)
            .error('alias - неверный формат'));
        rules.set(rules.rule('name')
            .type(lib_2.ModelRulesT.text)
            .error('name - неверный формат'));
        rules.set(rules.rule('descript')
            .type(lib_2.ModelRulesT.text)
            .error('desc - неверный формат'));
        rules.set(rules.rule('type')
            .type(lib_2.ModelRulesT.int)
            .error('type - неверный формат'));
        return rules.get();
    }
}
//Имя таблицы
GroupE.NAME = 'aa_group';
exports.GroupE = GroupE;
//# sourceMappingURL=GroupE.js.map