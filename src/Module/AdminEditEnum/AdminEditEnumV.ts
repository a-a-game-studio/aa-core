
import * as Components from '@a-a-game-studio/aa-components/lib';
import { System } from '../..';

// =======================================================
/**
 * Получить Список пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function init(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Выбрать группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function selectEnum(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // Сколько записей получать
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_enum', 'id_enum')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Выбрать контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function selectEnumParam(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID контроллера доступа
    rules.set(rules.rule('id_enum_param')
        .type(Components.ModelRulesT.int)
        .require()
        .moreOrEq(0)
        .errorEx('id_enum_param', 'id_enum_param')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Добавить права группе на контроллер
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function addEnumParamToEnum(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID пользователя
    rules.set(rules.rule('id_enum_param')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum_param', 'id_enum_param')
    );

    // ID группы
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum', 'id_enum')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Удалить права на контроллер у группы
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function delEnumParamFromEnum(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID контроллера доступа
    rules.set(rules.rule('id_enum_param')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum_param', 'id_enum_param')
    );

    // ID группы
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum', 'id_enum')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}


// =======================================================
/**
 * Добавить группу пользователей
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function addEnum(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // псевдоним
    rules.set(rules.rule('alias')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(3)
        .maxLen(100)
        .errorEx('alias', 'alias')
    );

    // Наименование
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // Описание
    rules.set(rules.rule('descript')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(6)
        .maxLen(100)
        .errorEx('descript', 'descript')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}


// =======================================================
/**
 * Добавить группу контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function addEnumParam(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // псевдоним
    rules.set(rules.rule('alias')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(3)
        .maxLen(100)
        .errorEx('alias', 'alias')
    );

    // Наименование
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // Описание
    rules.set(rules.rule('descript')
        .type(Components.ModelRulesT.text)
        .require()
        .minLen(6)
        .maxLen(100)
        .errorEx('descript', 'descript')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

// =======================================================
/**
 * Удалить группу
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function delEnum(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID группы
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .require()
        .more(0)
        .errorEx('id_enum', 'id_enum')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}


// =======================================================
/**
 * Сохранить данные о группе
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function saveEnum(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID пользователя
    rules.set(rules.rule('id_enum')
        .type(Components.ModelRulesT.int)
        .more(0)
        .errorEx('id_enum', 'id_enum')
    );

    // Имя
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // Описание
    rules.set(rules.rule('descript')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('descript', 'descript')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}

/**
 * Сохранить контроллер доступа
 *
 * @param req MainRequest
 * @param data RequestI
 */
export function saveEnumParam(req: System.MainRequest, data: any) {
    let rules = new Components.ModelRulesC();

    // ---------------------------------------

    // ID контроллера доступа
    rules.set(rules.rule('id_enum_param')
        .type(Components.ModelRulesT.int)
        .more(0)
        .errorEx('id_enum_param', 'id_enum_param')
    );

    // Имя
    rules.set(rules.rule('name')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('name', 'name')
    );

    // Описание
    rules.set(rules.rule('descript')
        .type(Components.ModelRulesT.text)
        .minLen(3)
        .maxLen(100)
        .errorEx('descript', 'descript')
    );

    // ---------------------------------------

    let validator = new Components.ModelValidatorSys(req.sys.errorSys);
    validator.fValid(rules.get(), data);

    return validator.getResult();
}
