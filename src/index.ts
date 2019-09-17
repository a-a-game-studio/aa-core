
// Подключене системных файлов для экспорта
import * as Controller from './Namespace/Controller'

// Подключене системных файлов для экспорта
import * as System from './Namespace/System'

// Подключене системных файлов
import * as Middleware from './Namespace/Middleware'

// Подключение компонентной библиотеки
import * as Components from '@a-a-game-studio/aa-components/lib';

import { App } from "./App";

export {
    Controller,
    System,
    Components, // Общие компоненты
    Middleware,
    App, // готовое собранно приложение
}
