"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Компоненты
const lib_1 = require("@a-a-game-studio/aa-classes/lib");
class UserSmsCodeE {
    getRulesInsert() {
        let rules = new lib_1.Components.ModelRulesC();
        rules.set(rules.rule('id_user')
            .type(lib_1.Components.ModelRulesT.int)
            .error(UserSmsCodeE.NAME + '.id_user'));
        rules.set(rules.rule('code')
            .type(lib_1.Components.ModelRulesT.text)
            .error(UserSmsCodeE.NAME + '.code'));
        return rules.get();
    }
}
//Имя таблицы
UserSmsCodeE.NAME = 'aa_user_sms_code';
exports.UserSmsCodeE = UserSmsCodeE;
//# sourceMappingURL=UserSmsCodeE.js.map