exports.up = async function (knex, Promise) {
    const bHasTable = await knex.schema.hasTable('aa_user_avatar');
    if (bHasTable) {
        // await knex.schema.dropTable('aa_user_avatar');
    }
    await knex.schema.createTable('aa_user_avatar', (table) => {
        table.increments('id');
        table.integer('user_id').index('user_id')
            .comment('ID пользователя');
        table.string('filename', 1024)
            .comment('filename - имя файла');
        table.dateTime('created_at').index('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .comment('Время создания записи');
        table.comment('Аватарка пользователя');
        table.collate('utf8_bin');
    });
};
exports.down = async (knex) => {
    const bHasTable = await knex.schema.hasTable('aa_user_avatar');
    if (bHasTable) {
        // await knex.schema.dropTable('aa_user_avatar');
    }
    return knex.schema;
};
//# sourceMappingURL=004_user_avatar.js.map