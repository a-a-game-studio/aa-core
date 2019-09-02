"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-components/lib");
class UserE {
    getRulesInsert() {
        let rules = new lib_1.ModelRulesC();
        rules.set(rules.rule('login')
            .type('text')
            .error('user_email - неверный формат'));
        rules.set(rules.rule('name')
            .type('text')
            .error('name - неверный формат'));
        rules.set(rules.rule('email')
            .type('text')
            .error('user_email - неверный формат'));
        rules.set(rules.rule('pswd')
            .type('text')
            .error('pswd - неверный формат'));
        return rules.get();
    }
}
exports.UserE = UserE;
//Имя таблицы
UserE.NAME = 'aa_user';
//# sourceMappingURL=UserE.js.map