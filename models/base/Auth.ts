import type { AuthLoginParams } from "~/types";

/** Модель авторизации
 * @param {string} username - Логин
 * @param {string} password - Пароль
 */
export class AuthLogin {
    username: string;
    password: string;

    /** Конструктор
     * 
     * @param {AuthLoginParams} opts - Логин и пароль 
     */
    constructor(opts: AuthLoginParams) {
        this.username = opts.username;
        this.password = opts.password;
    }
}