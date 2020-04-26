"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
class FileE {
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('file_name')
            .type('text')
            .require()
            .error('file_name - неверный формат'));
        return rules.get();
    }
    /** Правила обновления таблицы */
    getRulesUpdate() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('file_name')
            .typeText()
            .error(FileE.NAME + ' - file_name'));
        return rules.get();
    }
}
//Имя таблицы
FileE.NAME = 'aa_file';
exports.FileE = FileE;
//# sourceMappingURL=FileE.js.map