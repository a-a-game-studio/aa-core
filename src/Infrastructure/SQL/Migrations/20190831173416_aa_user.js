
const md5 = require('md5');

exports.up = async function(knex, Promise) {
    
    const hasUser = await knex.schema.hasTable('aa_user');

    if (hasUser) {
        await knex.schema.dropTable('aa_user');
    }

    await knex.schema.createTable('aa_user', table => {
        table.increments('id');

        table.string('name', 100).index('name')
            .comment('Отображаемое имя');

        table.string('fullname', 100).index('fullname')
            .comment('Полное имя');

        table.string('login', 50).unique('login')
            .notNullable()
            .comment('Псевдоним');

        table.string('email', 100).unique('email')
            .notNullable()
            .comment('Электронная почта');

        table.string('pswd', 50).index('pswd')
            .notNullable()
            .comment('Электронная почта');

        table.string('avatar', 100).index('avatar')
            .comment('аватарка');

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

    await knex('aa_user')
        .insert([
            {
                name: 'Админ',
                login: 'admin',
                pswd: md5('Angel13q24w35e'),
                email: 'angelrinascita@gmail.com',
                created_at: knex.fn.now(),
            },
        ])
    ;

    return knex.schema;
    
};

exports.down = async knex => {
    const hasUser = await knex.schema.hasTable('aa_user');
    if (hasUser) {
        await knex.schema.dropTable('aa_user');
    }

    return knex.schema;
};