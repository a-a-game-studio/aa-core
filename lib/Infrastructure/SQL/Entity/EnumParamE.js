"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumParamE = void 0;
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
const lib_2 = require("@a-a-game-studio/aa-components/lib");
/**
 * Свойство
 */
class EnumParamE {
    /**
     * Вставка ключевых записей таблицы
     */
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('id_enum')
            .type(lib_2.ModelRulesT.int)
            .errorEx(EnumParamE.NAME + '.id_enum', 'id_enum - неверные данные'));
        return rules.get();
    }
    /**
     * Обновление ключевых записей таблицы
     */
    getRulesUpdate() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('k')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumParamE.NAME + '.k', 'k - неверные данные'));
        rules.set(rules.rule('name')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumParamE.NAME + '.name', 'name - неверные данные'));
        rules.set(rules.rule('val')
            .type(lib_2.ModelRulesT.int)
            .errorEx(EnumParamE.NAME + '.val', 'val - неверные данные'));
        rules.set(rules.rule('descript')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumParamE.NAME + '.descript', 'descript - неверные данные'));
        rules.set(rules.rule('type')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumParamE.NAME + '.type', 'type - неверные данные'));
        rules.set(rules.rule('arg1')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumParamE.NAME + '.arg1', 'arg1 - неверные данные'));
        rules.set(rules.rule('arg2')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumParamE.NAME + '.arg2', 'arg2 - неверные данные'));
        rules.set(rules.rule('arg3')
            .type(lib_2.ModelRulesT.text)
            .errorEx(EnumParamE.NAME + '.arg3', 'arg3 - неверные данные'));
        return rules.get();
    }
}
exports.EnumParamE = EnumParamE;
//Имя таблицы
EnumParamE.NAME = 'aa_enum_param';
//# sourceMappingURL=EnumParamE.js.map