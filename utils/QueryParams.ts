/** Класс для работы с URLSearchParams
 * 
 */
export class QueryParams {
    private route;
    private router;
    private origin;

    constructor(route: any, router: any) {
        this.route  = route;
        this.router = router;
        this.origin = 'http://127.0.0.1';
    }

    /** Получение роута с установленными параметрам
     * 
     * @param queries - ключи и их значения
     * @returns - URL с установленными параметрами, без origin'a
     */
    public getURLSearchParams(queries: any) {
        const url = new URL(this.origin + this.route.fullPath);
        
        Object.entries(queries).forEach(([key, value]) => {
            const prevValue = url.searchParams.get(key);
            
            if (prevValue && prevValue === value)
                url.searchParams.delete(key);
            else
                url.searchParams.set(key, value as string); 
        });

        return url.href.replace(url.origin, '');
    }


    /** Обновление URL Search Params страницы
     * 
     * @param data - ключи и значения параметров
     * @param callback - дополнительный обработчик
     */
    public updateQueries(data: any, callback?: Function) {
        const prevQueries = this.route.query;
        Object.keys(data).forEach(key => {
            delete prevQueries[key];
        });
        
        if (callback)
            callback.call(this);
        
        const result = JSON.parse(JSON.stringify({ 
            ...prevQueries,
            ...data
        }));
        
        this.router.replace({
            path: this.route.path,
            query: { ...result }
        });
    }
}   