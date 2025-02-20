export interface PaginationStrategy {
    getPage(args: PaginationParams): number;
}

export type PaginationParams = {
    content: string | number;
    _class: string;
    currentPage: number;
}