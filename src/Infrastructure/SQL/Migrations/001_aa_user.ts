
const md5 = require('md5');

exports.up = async function (knex: any, Promise: any) {

    const hasUser = await knex.schema.hasTable('aa_user');

    if (hasUser) {
        // await knex.schema.dropTable('aa_user');
    }

    await knex.schema.createTable('aa_user', (table: any) => {
        table.increments('id');

        table.string('name', 100).index('name')
            .comment('Отображаемое имя');

        table.string('surname', 100).index('surname')
            .comment('Фимилия');

        table.string('patronymic', 100).index('patronymic')
            .comment('Отчество');

        table.string('login', 50).unique('login')
            .notNullable()
            .comment('Псевдоним');

        table.string('email', 100).unique('email')
            .notNullable()
            .comment('Электронная почта');

        table.string('pswd', 32).index('pswd')
            .notNullable()
            .comment('Пароль');       

        table.dateTime('created_at').index('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .comment('Время создания записи');

        table.integer('city').index('city')
            .comment('Город');

        table.date('birthday')
            .comment('День рождения');

        table.comment('Таблица пользователь');
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
        ]);

    return knex.schema;

};

exports.down = async (knex: any) => {
    const hasUser = await knex.schema.hasTable('aa_user');
    if (hasUser) {
        // await knex.schema.dropTable('aa_user');
    }

    return knex.schema;
};