"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aa_user = require('./Infrastructure/SQL/Migrations/001_aa_user.js');
const aa_user_token = require('./Infrastructure/SQL/Migrations/002_aa_user_token.js');
const aa_user_sms_code = require('./Infrastructure/SQL/Migrations/003_aa_user_sms_code.js');
const user_avatar = require('./Infrastructure/SQL/Migrations/004_user_avatar.js');
const aa_access_group = require('./Infrastructure/SQL/Migrations/005_aa_access_group.js');
const aa_group = require('./Infrastructure/SQL/Migrations/006_aa_group.js');
const aa_user_group = require('./Infrastructure/SQL/Migrations/007_aa_user_group.js');
const aa_ctrl_access = require('./Infrastructure/SQL/Migrations/008_aa_ctrl_access.js');
const readline = require('readline');
/**
 * Дефотная миграция
 */
class AppDefaultMigration {
    constructor(objDb) {
        this.objDb = objDb;
    }
    async faRun() {
        console.log('aa_user');
        await aa_user.up(this.objDb);
        console.log('aa_user_token');
        await aa_user_token.up(this.objDb);
        console.log('aa_user_sms_code');
        await aa_user_sms_code.up(this.objDb);
        console.log('user_avatar');
        await user_avatar.up(this.objDb);
        console.log('aa_access_group');
        await aa_access_group.up(this.objDb);
        console.log('aa_group');
        await aa_group.up(this.objDb);
        console.log('aa_user_group');
        await aa_user_group.up(this.objDb);
        console.log('aa_ctrl_access');
        await aa_ctrl_access.up(this.objDb);
        console.log("Default migration done!");
        process.exit(0);
    }
}
exports.AppDefaultMigration = AppDefaultMigration;
//# sourceMappingURL=AppDefaultMigration.js.map