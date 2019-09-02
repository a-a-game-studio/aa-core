"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-components/lib");
class UserSmsCodeE {
    getRulesInsert() {
        let rules = new lib_1.ModelRulesC();
        rules.set(rules.rule('user_id')
            .type(lib_1.ModelRulesT.int)
            .error(UserSmsCodeE.NAME + '.user_id'));
        rules.set(rules.rule('code')
            .type(lib_1.ModelRulesT.text)
            .error(UserSmsCodeE.NAME + '.code'));
        return rules.get();
    }
}
exports.UserSmsCodeE = UserSmsCodeE;
//Имя таблицы
UserSmsCodeE.NAME = 'aa_user_sms_code';
//# sourceMappingURL=UserSmsCodeE.js.map