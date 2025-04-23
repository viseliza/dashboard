import type { Statistic } from '~/models';
import type { TableMode } from '~/types';

export const useServiceStore = defineStore('service', {
    state: () => ({
        tableMode: 'accounts' as TableMode,
        serviceCode: '',
        stats: {} as Statistic,
        isRefresh: false,
        isRelink: false,
        requestParams: {} as any
    }),
    actions: {
       updateParams(params: any) {
            this.tableMode = params.tableMode;
            this.serviceCode = params.serviceCode;
            this.isRefresh = params.isRefresh;
            this.isRelink = params.isRelink;
            this.requestParams = params.requestParams;
       }
    }
})