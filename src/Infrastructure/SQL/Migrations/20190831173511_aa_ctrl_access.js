
exports.up = function(knex, Promise) {
    const hasCtrlAccess = await knex.schema.hasTable('ctrl_access');

    if (!hasCtrlAccess) {
        await knex.schema.createTable('ctrl_access', table => {
            table.increments('id');

            table.string('name').unique('alias')
                .comment('Наименование модуля/контроллера');

            table.string('alias').unique('alias')
                .notNullable()
                .collate('utf8_bin')
                .comment('Псевдоним модуля/контроллера');

            table.text('descript')
                .collate('utf8_bin')
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

        await knex('ctrl_access')
            .insert([
                {
                    name: 'Редактирование_прав_пользователей',
                    alias: 'api_admin_user',
                    descript: '',
                    created_at: knex.fn.now(),
                },
            ])
        ;
    }

    
};

exports.down = function(knex, Promise) {
  
};
