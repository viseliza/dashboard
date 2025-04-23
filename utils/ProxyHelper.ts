export type Categories = {
    'Основные': {
        type: string;
        mode: string;
        checkInternet: boolean;
        enable: boolean;
    },
    'Подключение': {
        host: string;
        port: number;
    },
    'Время': {
        created_at: number;
        updated_at: number;
    },
    'Авторизация': {
        enable: boolean;
        username: string;
        password: string;
    },
    'Обновление': {
        enable: boolean;
        link: string;
        seconds: number;
    }
}

export class ProxyHelper {
    public categories: Categories;
    public proxyParams: any;
    private id: any;

    constructor (id?: any, categories?: any | null, withValues: boolean = false) {
        this.id = id;
        this.categories = {
            'Основные': {
                type: categories?.type || 'socks5',
                mode: categories?.mode || 'refresher',
                checkInternet: categories?.checkInternet || false,
                enable: categories?.enable || false,
            },
            'Подключение': {
                host: categories?.host || '0.0.0.0',
                port: categories?.port || 4173,
            },
            'Время': {
                created_at: categories?.created_at || 0,
                updated_at: categories?.updated_at || 0,
            },
            'Авторизация': {
                enable: categories?.auth?.enable || false,
                username: categories?.auth?.username || '',
                password: categories?.auth?.password || '',
            },
            'Обновление': {
                enable: categories?.update?.enable || false,
                link: categories?.update?.link || '',
                seconds: categories?.update?.seconds || 0,
            }
        };

        this.proxyParams = Object.entries(this.categories).reduce((params: any, [key, value]) => {
            params[key] = {};
            
            Object.keys(value as any).forEach((_key) => {
                const isCategory = key === 'Авторизация' || key === 'Обновление';
                params[key][_key] = {
                    example: (value as any)[_key],
                    type: typeof (value as any)[_key],
                    required: isCategory && _key !== 'enable' ? false : true,
                }
                if (withValues)
                    params[key][_key].value = (value as any)[_key];

                if (typeof (value as any)[_key] == 'boolean') 
                    params[key][_key].type = [true, false];
                
                if (_key == 'type')
                    params[key][_key].type = ['http', 'https', 'socks4', 'socks5'];
    
                if (_key == 'mode')
                    params[key][_key].type = ['streaks', 'refresher', 'concurrent_requests']; 
            });
            return params;
        }, {});
        
        Object.assign(this.proxyParams['Основные'], this.proxyParams['Подключение']);
        ['Подключение', 'Время'].forEach((key) => delete this.proxyParams[key]);
    }

    /** Преобразование данных из формы в модель Proxy для отправки на сервер 
     * 
     * @param data - данные из формы
     * @returns параметры для выполнения API запроса
    */
    public getProxyParams (data: any) {
        return Object.keys(this.proxyParams).reduce((params: any, key) => {
            if (key === 'Авторизация' || key === 'Обновление') {
                params[key === 'Авторизация' ? 'auth' : 'update'] = {};
                Object.keys(this.proxyParams[key]).forEach((_key) => {
                    params[key === 'Авторизация' ? 'auth' : 'update'][_key] = data[key][_key].value;
                });
            } else {
                Object.keys(data[key]).forEach((_key) => {
                    params[_key] = data[key][_key].value;
                });
            }
            return params;
        }, {});
    }

    public getUpdateParams (data: any) {
        return { 
            id: this.id, 
            body: { ...this.getProxyParams(data) } 
        };
    }
}