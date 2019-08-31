
exports.up = async function(knex, Promise) {
    const hasCtrlAccess = await knex.schema.hasTable('aa_ctrl_access');

    if (hasCtrlAccess) {
        await knex.schema.dropTable('aa_ctrl_access');
    }

    await knex.schema.createTable('aa_ctrl_access', table => {
        table.increments('id');

        table.string('name', 100)
            .comment('Наименование модуля/контроллера');

        table.string('alias', 50).unique('alias')
            .notNullable()
            .comment('Псевдоним модуля/контроллера');

        table.text('descript')
            .comment('Описание модуля/контроллера');

        table.dateTime('created_at').index('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .comment('Время создания записи');

        table.dateTime('updated_at').index('updated_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .comment('Время обновления записи');
            
        table.comment('Таблица прав доступа группы к модулю/контроллеру');
        table.collate('utf8_bin');
    });

    await knex('aa_ctrl_access')
        .insert([
            {
                name: 'Редактирование_прав_пользователей',
                alias: 'admin_user',
                descript: 'Позволяет редактировать поля пользователям',
            },
        ])
    ;
    
};

exports.down = async knex => {
    const hasUser = await knex.schema.hasTable('aa_ctrl_access');
    if (hasUser) {
        await knex.schema.dropTable('aa_ctrl_access');
    }

    return knex.schema;
};
