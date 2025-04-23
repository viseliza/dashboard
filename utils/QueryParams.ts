/** Класс для работы с URLSearchParams
 * 
 */
export class QueryParams {
    private origin;
    private route;  
    private router;

    constructor() {
        this.origin = 'http://127.0.0.1';
        this.route = useRoute();
        this.router = useRouter();
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
    static updateQueries(data: any, callback?: Function) {
        const route = useRoute();
        const router = useRouter();
        
        const prevQueries = route.query;
        Object.keys(data).forEach(key => {
            delete prevQueries[key];
        });
        
        if (callback)
            callback.call(this);
        
        const result = JSON.parse(JSON.stringify({ 
            ...prevQueries,
            ...data
        }));
        
        router.push({
            path: route.path,
            query: { ...result }
        });
    }

    static removeQuery(data: string) {
        const route = useRoute();
        const router = useRouter();

        const newQuery = { ...route.query };

        delete newQuery[data];

        router.push({ 
            path: route.path, 
            query: newQuery 
        });
    }
}   