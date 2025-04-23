import type { DumpState } from '~/types';
import { Tokens } from '~/models';

export const useDumpStore = defineStore('dump', {
    state: (): DumpState => ({
        table: [] as any[],
        tokens: Tokens.getTokens(),
        classParams: {},
        requestParams: {},
        defaultRules: [],
        maxPages: 0,
        count: 0,
    }),
    getters: {
        params: (state) => {
            const { page } = state.requestParams;
            delete state.requestParams.page;
            state.requestParams.limit = 25;
            state.requestParams.offset = page ? (Number(page) - 1) * 25 : 0;
            
            return JSON.parse(JSON.stringify(state.requestParams));
        },
    },
    actions: {
        getRules() {
            return {
                'string': (value: string) => value,
                'timestamp': this.convertTimestamp,
                'page': this.convertPage,
            } as any
        },
        initializate(requestParams: any, defaultRules: any) {
            this.requestParams = requestParams;
            this.defaultRules = defaultRules;
            this.convertRequestParams();
            this.refreshRequestParams();    
        },
        convertTimestamp(value: string) {
            return value
                ? Number.parseInt(value)
                : undefined
        },
        convertPage(value: string) {
            return Number.parseInt(value || '1');
        },
        convertParams(params: any) {
            return Object.keys(params).map((key: string) => {
                return this.getRules()[key](params[key]);
            });
        },
        refreshRequestParams(queries?: any): void {
            Object.keys(this.classParams).forEach(param => {
                const obj = this.classParams[param];
                if (queries) 
                    obj.value = queries[param];

                this.requestParams[param] = this.getRules()[obj.rule](obj.value)
            });
        },
        convertRequestParams(): void {
            this.classParams = {};
    
            Object.keys(this.requestParams).forEach((param, index) => {
                const obj = this.requestParams[param];
                this.classParams[param] = {
                    value: obj,
                    rule: this.defaultRules[index]
                }
            });
        },
        updateItem(id: string, item: any) {
            this.table = this.table.map((row: any) => {
                if (row.id === id) {
                    return Object.assign(row, item);
                }
                return row;
            });
            console.log('updateItem', this.table);
        },
        deleteItem(id: string) {
            this.table = this.table.filter((row: any) => row.id !== id);
        },
        getItem(id: string) {
            return this.table.find((row: any) => row.id === id);
        }
    }
})