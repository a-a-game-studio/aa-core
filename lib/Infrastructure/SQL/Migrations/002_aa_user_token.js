exports.up = async function (knex, Promise) {
    const hasUserToken = await knex.schema.hasTable('aa_user_token');
    if (hasUserToken) {
        // await knex.schema.dropTable('aa_user_token');
    }
    await knex.schema.createTable('aa_user_token', (table) => {
        table.increments('id');
        table.integer('user_id').index('user_id')
            .comment('ID пользователя');
        table.string('token', 60).index('token')
            .comment('apikey - ключ доступа пользователя');
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
};
exports.down = async (knex) => {
    const hasUserToken = await knex.schema.hasTable('aa_user_token');
    if (hasUserToken) {
        // await knex.schema.dropTable('aa_user_token');
    }
    return knex.schema;
};
//# sourceMappingURL=002_aa_user_token.js.map