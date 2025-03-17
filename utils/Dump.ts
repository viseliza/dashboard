import type { Tokens } from "~/models";

/** Класс для дампа данных из API
 * 
 */
export class Dump {
    private api: any;
    private tokens: Tokens;
    private classParams: any;
    private requestParams: any;
    private rules = {
        'string': (value: string) => value,
        'timestamp': this.convertTimestamp,
        'page': this.convertPage,
    }
    private defaultRules: any[];
    public maxPages: number = 0;
    public count: number = 0;

    
    /** Конструктор класса
     * @param requestParams - параметры запроса
     * @param defaultRules - правила для параметров запроса
     * @param api - API
     * @param tokens - токены
     */
    constructor(requestParams: any, defaultRules: any[], api: any, tokens: Tokens) {
        this.requestParams = requestParams;
        this.defaultRules = defaultRules;
        this.convertRequestParams();
        this.refreshRequestParams();
        this.api = api;
        this.tokens = tokens;
    }


    /** Выполнение запроса на получение данных
     *  @returns - данные
     */
    public async dump(func?: Function, params?: any) {
        params = params || this.getParams();
        const dumpResult = await this.api.privateCall(
            func || this.api.dump,
            params,
            this.tokens
        );

        this.maxPages = Math.ceil(dumpResult.count / 25);
        this.count = dumpResult.count;
        return {
            data: dumpResult.data,
            maxPages: this.maxPages,
            count: this.count,
        };
    }


    /** Получение параметров запроса без нулевых значений
     *  @returns - параметры запроса
     */
    public getParams(): any {
        const { page } = this.requestParams;
        delete this.requestParams.page;
        this.requestParams.limit = 25;
        this.requestParams.offset = (Number(page) - 1) * 25;
        
        return JSON.parse(JSON.stringify(this.requestParams));
    }
    

    /** Обновление параметров запроса
     *  @param queries - текущие параметры в маршруте
     */
    public refreshRequestParams(queries?: any): void {
        Object.keys(this.classParams).forEach(param => {
            const obj = this.classParams[param];
            if (queries) 
                obj.value = queries[param];
            this.requestParams[param] = this.rules[obj.rule as keyof typeof this.rules](obj.value)
        });
    }

    /** Конвертация параметров запроса в параметры класса
     * 
     */
    public convertRequestParams(): void {
        this.classParams = {};

        Object.keys(this.requestParams).forEach((param, index) => {
            const obj = this.requestParams[param];
            this.classParams[param] = {
                value: obj,
                rule: this.defaultRules[index]
            }
        });
    }


    /** Конвертация параметра типа timestamp в timestamp
     *  @param timestamp - строка с timestamp
     *  @returns - timestamp
     */
    private convertTimestamp(timestamp: string): number | undefined {
        return timestamp 
            ? Number.parseInt(timestamp)
            : undefined
    }


    /** Конвертация параметра типа page в число
     * 
     */
    private convertPage(value: string): number {
        return Number.parseInt(value || '1');
    }
}