[<<< На главную](./index.MD)

# App - класс приложения

## Пример использования
``` typescript
    import { App, System } from '@a-a-game-studio/aa-core/lib';

    let conf: System.MainRequest.ConfI;
    const app = new App(conf)
        .fDisableCors() // отключаем cors
        .fUseBodyParser() // используем дефолтный BodyParser
        .fStart(); // Запускаем приложение
```

``` bash
    server start at http://localhost:3005
```

[<<< На главную](./index.MD)