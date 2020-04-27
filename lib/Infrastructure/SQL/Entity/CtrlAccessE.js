"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
const lib_2 = require("@a-a-game-studio/aa-components/lib");
class CtrlAccessE {
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
            .error('descript - неверный формат'));
        return rules.get();
    }
    /**
     *  Правила создания записей в таблице
     */
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('alias')
            .type(lib_1.Components.ModelRulesT.text)
            .require()
            .minLen(3)
            .maxLen(50)
            .error('alias - неверный формат'));
        rules.set(rules.rule('name')
            .type(lib_1.Components.ModelRulesT.text)
            .minLen(3)
            .maxLen(100)
            .error('alias - неверный формат'));
        rules.set(rules.rule('descript')
            .type(lib_1.Components.ModelRulesT.text)
            .error('alias - неверный формат'));
        return rules.get();
    }
}
//Имя таблицы
CtrlAccessE.NAME = 'aa_ctrl_access';
exports.CtrlAccessE = CtrlAccessE;
//# sourceMappingURL=CtrlAccessE.js.map