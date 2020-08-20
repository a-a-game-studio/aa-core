"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumE = void 0;
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
const lib_2 = require("@a-a-game-studio/aa-components/lib");
/**
 * Список свойств
 */
class EnumE {
    /**
     * Вставка ключевых записей таблицы
     */
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        return rules.get();
    }
    /**
     * Обновление ключевых записей таблицы
     */
    getRulesUpdate() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('k')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumE.NAME + '.k', 'k - неверные данные'));
        rules.set(rules.rule('name')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumE.NAME + '.name', 'name - неверные данные'));
        rules.set(rules.rule('descript')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumE.NAME + '.descript', 'descript - неверные данные'));
        rules.set(rules.rule('path1')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumE.NAME + '.path1', 'path1 - неверные данные'));
        rules.set(rules.rule('path2')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumE.NAME + '.path2', 'path2 - неверные данные'));
        rules.set(rules.rule('path3')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumE.NAME + '.path3', 'path3 - неверные данные'));
        return rules.get();
    }
}
exports.EnumE = EnumE;
//Имя таблицы
EnumE.NAME = 'aa_enum';
//# sourceMappingURL=EnumE.js.map