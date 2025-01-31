import type { 
    IStreak, 
    IStreakCreate, 
    IStreakCreateMany, 
    IStreakUpdate
} from "~/types/models/durak/streak";

/** Модель штриха Дурака
 * 
 * @param {string} param.id
 * @param {number} param.points
 * @param {boolean} param.opened
 * @param {number} param.opened_at
 * @param {number} param.created_at
 * @param {number} param.updated_at
 */
export class Streak implements IStreak {
    id: string;
    points: number;
    opened?: boolean;
    opened_at?: number;
    created_at?: number;
    updated_at?: number;

    /** Конструктор
     * 
     * @param {IStreak} opts 
     */
    constructor(opts: IStreak) {
        this.id         = opts.id;
        this.points     = opts.points;
        this.opened     = opts.opened;
        this.opened_at  = opts.opened_at;
        this.created_at = opts.created_at;
        this.updated_at = opts.updated_at;
    }
    

    getUpdateParams() {
        return {
            'id': '',
            'points': ''
        }
    }
    

    static updateParams = {
        id: {
            type: 'string',
            example: '1.1.1.1'
        },
        points: {
            type: 'number',
            example: 1000
        }
    }

    static createParams = {
        points: {
            type: 'number',
            example: 1000
        }
    }

    static createManyParams = {
        points: {
            type: 'number',
            example: 1000
        },
        count: {
            type: 'number',
            example: 10
        }
    }

    static getCreateParams() {
        return { 'points': '' }
    }
    

    static getCreateManyParams() {
        return {
            'points': '',
            'count': ''
        }
    }
    

    /** Проверка валидации Id по маске
     * 
     * @param {string} id - Id для проверки валидности
     * @returns {boolean} - Булевое значение в зависимости прошел ли Id проверку
     */
    static validityId(id: string): boolean {
        /** Проверка валидности длинной маски
         * 
         * @param {string} str 
         * @returns 
         */
        const expLong = (str: string) => /^[0-9]{8}$/.test(str);
        
        /** Проверка валидности длинной маски
         * 
         * @param {string} str 
         * @returns 
         */
        const expShort = (str: string) => /^[0-9]{4}$/.test(str);
        const parts = id.split('-');

        if (parts.length !== 5) 
            return false;

        const result = parts.map((part, index) => {
            if (index == 0 || index == 4) 
                return expLong(part);
            else
                return expShort(part);
        });

        return result.indexOf(false) == -1 ? true : false;
    }


    /** Проверка валидации поля Points
     * 
     * @param {number} points - поле points для проверки валидности
     * @returns {boolean} - Булевое значение в зависимости прошло ли значение проверку
     */
    static validityPoints(points: number): boolean {
        return points >= 0 && points <= 1_000_000;
    }


    /** Проверка валидации поля Points
     * 
     * @param {number} count - количество записей для проверки валидности
     * @returns {boolean} - Булевое значение в зависимости прошло ли значение проверку
     */
    static validityCount(count: number): boolean {
        return count >= 1 && count <= 1_000;
    }
}


export class StreakUpdate implements IStreakUpdate {
    id: string;
    points: number;

    /** Конструктор
     * 
     * @param {IStreakUpdate} opts 
     */
    constructor(opts: IStreakUpdate) {
        this.id = opts.id;
        opts.points = typeof opts.points === 'string' ? Number.parseInt(opts.points) : opts.points;
        
        if (opts.points < 0)
            throw new Error('Неправильное значение поля "points"');
        
        this.points = opts.points;
    }
}


export class StreakCreate implements IStreakCreate {
    points: number;

    /** Конструктор
     * 
     * @param {IStreakCreate} opts 
     */
    constructor(opts: IStreakCreate) {
        this.points = typeof opts.points === 'string' ? Number.parseInt(opts.points) : opts.points;
    }
}


export class StreakCreateMany implements IStreakCreateMany {
    points: number;
    count: number;

    /** Конструктор
     * 
     * @param {IStreakCreateMany} opts 
     */
    constructor(opts: IStreakCreateMany) {
        this.points = typeof opts.points === 'string' ? Number.parseInt(opts.points) : opts.points;
        this.count = typeof opts.count === 'string' ? Number.parseInt(opts.count) : opts.count;
    }
}