"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-components/lib");
class GroupsE {
    /**
     * Обновление ключевых записей таблицы
     */
    getRulesUpdate() {
        let rules = new lib_1.ModelRulesC();
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
exports.GroupsE = GroupsE;
//Имя таблицы
GroupsE.NAME = 'aa_group';
//# sourceMappingURL=GroupsE.js.map