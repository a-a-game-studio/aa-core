// Update with your config settings.

// Конфиг для настройки миграций в старой MySQL базе данных

let conf = require('./src/Config/MainConfig.js');

module.exports = {

    development: conf.mysql,

    staging: conf.mysql,

    production: conf.mysql

};
