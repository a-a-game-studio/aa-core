"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const md5 = require('md5');
exports.up = async function (knex, Promise) {
    const hasUser = await knex.schema.hasTable('aa_user_info');
    if (hasUser) {
        await knex.schema.dropTable('aa_user_info');
    }
    await knex.schema.createTable('aa_user_info', (table) => {
        table.increments('id');
        table.integer('id_user').index('id_user')
            .comment('ID пользователя');
        table.date('birthday')
            .comment('День рождения');
        table.integer('city_id').index('city_id')
            .defaultTo(0)
            .comment(' ID Город');
        table.integer('region_id').index('region_id')
            .defaultTo(0)
            .comment('ID Регион');
        table.integer('country_id').index('country_id')
            .defaultTo(0)
            .comment('ID страна');
        table.dateTime('created_at').index('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .comment('Время создания записи');
        table.dateTime('updated_at').index('updated_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .comment('Время обновления записи');
        table.comment('Таблица дополнительная информация о пользователе');
        table.collate('utf8_bin');
    });
    let user = (await knex('aa_user')
        .where({
        login: 'admin'
    })
        .limit(1)
        .select())[0];
    await knex('aa_user_info')
        .insert([
        {
            id_user: user.id
        },
    ]);
    return knex.schema;
};
exports.down = async (knex) => {
    const hasUser = await knex.schema.hasTable('aa_user_info');
    if (hasUser) {
        // await knex.schema.dropTable('aa_user_info');
    }
    return knex.schema;
};
//# sourceMappingURL=009_aa_user_info.js.map