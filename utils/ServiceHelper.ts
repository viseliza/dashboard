export class ServiceHelper {
    public serviceParams: any = {
        'Обновление данных': {} as any
    };
    public id: string = "";

    constructor(serviceParams: any, tableData: any) {
        this.id = tableData.id;

        Object.keys(serviceParams).forEach((key: any) => {
            if (key === 'id') return;
            
            this.serviceParams['Обновление данных'][key] = {
                ...serviceParams[key],
                value: tableData[key],
            };
        });

        this.serviceParams['Обновление данных']['enable'] = true;
    }
    
    /** Преобразование данных из формы в модель Proxy для отправки на сервер 
     * 
     * @param data - данные из формы
     * @returns параметры для выполнения API запроса
    */
    public getRequestParams (data: any) {
        return Object.entries(data).reduce((params: any, [key, value]) => {
            params[key] = data[key].value;
            return params;
        }, {})
    }

    public getConvertParams (data: any) {
        const serviceParams = Object
            .keys(data['Обновление данных'])
            .filter((key) => key !== 'enable');

        return serviceParams.reduce((params: any, key) => {
            params[key] = data['Обновление данных'][key].value;
            return params;
        }, {});
    }

    public getUpdateParams (data: any) {
        return {
            ...this.getConvertParams(data),
            id: this.id
        };
    }

    public getCreateParams (data: any) {
        return this.getRequestParams(data);
    }
}