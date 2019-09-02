"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-components/lib");
class CtrlAccessE {
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
            .error('descript - неверный формат'));
        return rules.get();
    }
    /**
     *  Правила создания записей в таблице
     */
    getRulesInsert() {
        let rules = new lib_1.ModelRulesC();
        rules.set(rules.rule('alias')
            .type('text')
            .error('alias - неверный формат'));
        return rules.get();
    }
}
exports.CtrlAccessE = CtrlAccessE;
//Имя таблицы
CtrlAccessE.NAME = 'aa_ctrl_access';
//# sourceMappingURL=CtrlAccessE.js.map