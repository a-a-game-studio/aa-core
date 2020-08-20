"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
exports.up = async function (knex, Promise) {
    const hasUserGroup = await knex.schema.hasTable('aa_user_group');
    if (hasUserGroup) {
        await knex.schema.dropTable('aa_user_group');
    }
    await knex.schema.createTable('aa_user_group', (table) => {
        table.increments('id');
        table.integer('id_user').index('id_user')
            .comment('ID пользователя');
        table.integer('id_group').index('id_group')
            .comment('ID группы');
        table.dateTime('created_at').index('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .comment('Время создания записи');
        table.dateTime('updated_at').index('updated_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .comment('Время обновления записи');
        table.comment('Связывает пользователя и группу');
        table.collate('utf8_bin');
    });
    await knex('aa_user_group')
        .insert([
        {
            id_user: 1,
            id_group: 1,
        },
    ]);
};
exports.down = async (knex) => {
    const hasUser = await knex.schema.hasTable('aa_user_group');
    if (hasUser) {
        // await knex.schema.dropTable('aa_user_group');
    }
    return knex.schema;
};
//# sourceMappingURL=007_aa_user_group.js.map