export interface FilterStrategy {
    getActions(): Array<Action>;
    getFilters(): any;
    getRequest(): any;
}

export type Action = {
    name: string;
    value: string;
}