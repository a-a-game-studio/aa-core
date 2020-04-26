"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = async function (knex, Promise) {
    let has = await knex.schema.hasTable('aa_file');
    if (has) {
        await knex.schema.dropTable('aa_file');
    }
    await knex.schema.createTable('aa_file', (table) => {
        table.increments('id');
        table.string('file_name', 32)
            .unique('file_name')
            .comment('Отображаемое имя');
        table.comment('Таблица файлы');
        table.collate('utf8_bin');
    });
    has = await knex.schema.hasTable('aa_img');
    if (has) {
        await knex.schema.dropTable('aa_img');
    }
    await knex.schema.createTable('aa_img', (table) => {
        table.increments('id');
        table.string('file_name', 32)
            .unique('file_name')
            .comment('Имя файла');
        table.string('f_320', 32)
            .unique('f_320')
            .comment('Имя файла');
        table.string('f_800', 32)
            .unique('f_800')
            .comment('Имя файла');
        table.string('а_1024', 32)
            .unique('а_1024')
            .comment('Имя файла');
        table.comment('Таблица файлы');
        table.collate('utf8_bin');
    });
    return knex.schema;
};
exports.down = async (knex) => {
    return knex.schema;
};
//# sourceMappingURL=010_aa_file.js.map