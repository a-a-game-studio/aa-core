"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-components/lib");
class UserE {
    getRules() {
        let rules = new lib_1.ModelRulesC();
        rules.set(rules.rule('user_id')
            .type('int')
            .error('user_id - неверный формат'));
        rules.set(rules.rule('user_email')
            .type('text')
            .error('user_email - неверный формат'));
        rules.set(rules.rule('user_fullname')
            .type('text')
            .error('user_fullname - неверный формат'));
        return rules.get();
    }
}
//Имя таблицы
UserE.NAME = 'phpbb_users';
exports.UserE = UserE;
//# sourceMappingURL=UserE.js.map