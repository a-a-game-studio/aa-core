"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
const lib_2 = require("@a-a-game-studio/aa-components/lib");
class UserE {
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('login')
            .type(lib_2.ModelRulesT.text)
            .require()
            .error('login - неверный формат'));
        rules.set(rules.rule('name')
            .type(lib_2.ModelRulesT.text)
            .error('name - неверный формат'));
        rules.set(rules.rule('email')
            .type(lib_2.ModelRulesT.text)
            .error('user_email - неверный формат'));
        rules.set(rules.rule('pswd')
            .type(lib_2.ModelRulesT.text)
            .require()
            .error('pswd - неверный формат'));
        return rules.get();
    }
    /** Правила обновления таблицы */
    getRulesUpdate() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('email')
            .typeText()
            .error(UserE.NAME + ' - email'));
        rules.set(rules.rule('name')
            .typeText()
            .error(UserE.NAME + ' - name'));
        rules.set(rules.rule('surname')
            .typeText()
            .error(UserE.NAME + ' - surname'));
        rules.set(rules.rule('patronymic')
            .typeText()
            .error(UserE.NAME + ' - surname'));
        return rules.get();
    }
    /** Правила обновления таблицы */
    getRulesChangePswd() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('pswd')
            .typeText()
            .error(UserE.NAME + ' - email'));
        return rules.get();
    }
}
//Имя таблицы
UserE.NAME = 'aa_user';
exports.UserE = UserE;
//# sourceMappingURL=UserE.js.map