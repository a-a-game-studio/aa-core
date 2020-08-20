import * as Controller from './Namespace/Controller';
import * as System from './Namespace/System';
import * as Middleware from './Namespace/Middleware';
import * as SQL from './Namespace/SQL';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import * as SeoModule from "./System/Seo";
import { App } from "./App";
import { AppDefaultMigration } from './AppDefaultMigration';
export { Controller, SQL, System, AAClasses, // Общие компоненты
Middleware, SeoModule, App, // готовое собранно приложение
AppDefaultMigration, };
