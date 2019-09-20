[<<< На главную](./index.MD)

# App - класс приложения

## Пример использования
``` typescript
    import { App } from '../../src/App';
    const config = require('./MainConfig.js');

    async function faRunServer() {

        console.log('Starting App...');

        const app = new App(config)
            .fUseMySql(); // используем MySql

        await app.faInstall(); // устанавливаем приложение

        app.fDisableCors() // отключаем cors
            .fUseBodyParser() // используем дефолтный BodyParser
            .fUseDefaultIndex() // используем дефолтный index
            .fUseReddis() // Reddis
            .fUseAuthSys() // авторизация
            .fUseAdminUser() // администриование пользователей
            .fStart(); // Запускаем приложение

    } // faRunServer

    faRunServer();
```

``` bash
    Starting App...
    Start install app...
    Start migrate DB...
    Migrate done!
    Install app done!
    server start at http://localhost:3005
```

[<<< На главную](./index.MD)