/**
 * Создание таблиц ctr_access и access_group
 * Для проверки доступа к модулям/контроллерам
 */

exports.up = async knex => {
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
                {
                    name: 'update_catalog',
                    alias: 'update_catalog',
                    descript: '',
                    created_at: knex.fn.now(),
                },
                {
                    name: 'api_update_catalog',
                    alias: 'api_update_catalog',
                    descript: '',
                    created_at: knex.fn.now(),
                },
                {
                    name: 'statement',
                    alias: 'statement',
                    descript: '',
                    created_at: knex.fn.now(),
                },
                {
                    name: 'cart_payment',
                    alias: 'cart_payment',
                    descript: '',
                    created_at: knex.fn.now(),
                },
            ]);
    }

    const hasAccessGroup = await knex.schema.hasTable('access_group');

    if (!hasAccessGroup) {
        await knex.schema.createTable('access_group', table => {
            table
                .increments('id');
            table
                .specificType('group_id', 'mediumint(8)')
                .unsigned()
                .notNullable()
                .comment('ID группы пользователей');
            table
                .integer('ctrl_access_id')
                .unsigned()
                .notNullable()
                .comment('ID контроллера доступа');
            table
                .boolean('create_access')
                .defaultTo(0)
                .comment('Права на создание');
            table
                .boolean('read_access')
                .defaultTo(0)
                .comment('Права на чтение');
            table
                .boolean('update_access')
                .defaultTo(0)
                .comment('Права на обновление');
            table
                .boolean('delete_access')
                .defaultTo(0)
                .comment('Права на удаление');
            table
                .timestamps(true, true);
            table
                .unique([
                    'group_id',
                    'ctrl_access_id',
                ]);
            table
                .comment('Таблица прав доступа группы к модулю/контроллеру');
            table
                .collate('utf8_bin');
        });

        await knex.schema.table('access_group', table => {
            table
                .foreign('group_id')
                .references('group_id')
                .inTable('phpbb_groups');
        });

        await knex.schema.table('access_group', table => {
            table
                .foreign('ctrl_access_id')
                .references('id')
                .inTable('ctrl_access');
        });

        await knex('access_group')
            .insert(
                {
                    group_id: 5,
                    ctrl_access_id: 1,
                    create_access: 1,
                    read_access: 1,
                    update_access: 1,
                    delete_access: 1,
                    created_at: knex.fn.now(),
                },
            );
    }

    return knex.schema;
};

exports.down = async knex => {
    const hasAccessGroup = await knex.schema.hasTable('access_group');
    if (hasAccessGroup) {
        await knex.schema.dropTable('access_group');
    }

    const hasCtrlAccess = await knex.schema.hasTable('ctrl_access');
    if (hasCtrlAccess) {
        await knex.schema.dropTable('ctrl_access');
    }

    return knex.schema;
};
