"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
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
            .type('text')
            .require()
            .error('alias - неверный формат'));
        rules.set(rules.rule('name')
            .type('text')
            .require()
            .error('name - неверный формат'));
        rules.set(rules.rule('descript')
            .type('text')
            .error('desc - неверный формат'));
        rules.set(rules.rule('type')
            .type('int')
            .error('type - неверный формат'));
        return rules.get();
    }
    /**
     * Обновление ключевых записей таблицы
     */
    getRulesUpdate() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('alias')
            .type('text')
            .error('alias - неверный формат'));
        rules.set(rules.rule('name')
            .type('text')
            .error('name - неверный формат'));
        rules.set(rules.rule('descript')
            .type('text')
            .error('desc - неверный формат'));
        rules.set(rules.rule('type')
            .type('int')
            .error('type - неверный формат'));
        return rules.get();
    }
}
//Имя таблицы
GroupE.NAME = 'aa_group';
exports.GroupE = GroupE;
//# sourceMappingURL=GroupE.js.map