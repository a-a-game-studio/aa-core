exports.up = async function(knex: any, Promise: any) {
    const hasUserToken = await knex.schema.hasTable('aa_user_token');

    if (hasUserToken) {
        // await knex.schema.dropTable('aa_user_token');
    }

    await knex.schema.createTable('aa_user_token', (table: any) => {
        table.increments('id');

        table.integer('user_id').index('user_id')
            .comment('ID пользователя');

        table.string('token', 50).index('token')
            .comment('token - ключ доступа пользователя');

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

exports.down = async (knex: any) => {
    const hasUserToken = await knex.schema.hasTable('aa_user_token');
    if (hasUserToken) {
        // await knex.schema.dropTable('aa_user_token');
    }

    return knex.schema;
};