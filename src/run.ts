import { App } from './App';

const app = new App()
    .fDisableCors() // отключаем cors
    .fUseBodyParser() // используем дефолтный BodyParser
    .fStart(); // Запускаем приложение




