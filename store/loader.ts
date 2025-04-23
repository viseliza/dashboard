import type { LoaderModel } from '~/types';

export const useLoader = defineStore('loader', {
    state: () => ({
        loading: {
            active: false,
            process: false,
            status: '',
            description: null,
            data: null,
            task: null,
            model: '',
            resultDetail: null,
        } as LoaderModel
    }),
    actions: {
        startLoading(data: any, task: string, model: string) {
            this.loading.active = true;
            this.loading.process = true;
            this.loading.data = data;
            this.loading.task = task;
            this.loading.model = model;
        },
        setResult(status: string, description: string | null, resultDetail?: any | null) {
            this.loading.process = false;
            this.loading.status = status;
            this.loading.description = description;
            this.loading.resultDetail = resultDetail;
        },
        closeLoader() {
            this.loading.active = false;
            this.loading.process = false;
            this.loading.status = '';
            this.loading.description = null;
            this.loading.data = null;
            this.loading.task = null;
            this.loading.model = '';
            this.loading.resultDetail = null;
        }
    }
})