import type { PaginationParams, PaginationStrategy } from "~/types";

/** Стратегия для работы с пагинацией */
export class Pagination {
    strategies: Record<string, PaginationStrategy> = {};

    use(name: string, strategy: PaginationStrategy) {
        this.strategies[name] = strategy;
    }

    getPage(name: string, args: any) {
        if (!this.strategies[name]) {
            console.error('Такой стратегии не существует');
            return 1;
        }

        return this.strategies[name].getPage.apply(null, [args]);
    }
}

/** Расчет страниц для пагинации */
export function calculatePages(currentPage: number, totalPages: number) {
    let active;
    let pageCutLow = currentPage - 1;
    let pageCutHigh = currentPage + 1;
    let paginations: Array<PaginationParams> = [];
    
    if (currentPage > 1 && totalPages) { 
        paginations.push({
            content: `mdi-chevron-left`,
            _class: 'arrow',
            currentPage: currentPage
        });
    }

    if (totalPages && totalPages < 6) {
        for (let page = 1; page <= totalPages; page++) {
            active = currentPage == page ? 'active' : '';
            paginations.push({
            content: page,
            _class: 'digit ' + active,
            currentPage: currentPage
        });
    }
    } else {
    if (currentPage > 2) {
        paginations.push({
            content: 1,
            _class: 'digit ' + active,
            currentPage: currentPage
        });
    
        if (currentPage > 3) {
            paginations.push({
                content: '...',
                _class: 'points left',
                currentPage: currentPage
            });
        }
    }
    if (currentPage === 1)
        pageCutHigh += 2;
    else if (currentPage === 2)
        pageCutHigh += 1;

    if (currentPage === totalPages)
        pageCutLow -= 2;
    else if (currentPage === totalPages - 1)
        pageCutLow -= 1;

    for (let page = pageCutLow; page <= pageCutHigh; page++) {
        if (page === 0)
            page += 1;
        if (page > totalPages)
            continue;

        active = page === currentPage ? 'active' : '';
        paginations.push({
            content: page,
            _class: 'digit ' + active,
            currentPage: currentPage
        });
    }

    if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
            paginations.push({
                content: '...',
                _class: 'points right',
                currentPage: currentPage
            });
            }
            paginations.push({
                content: totalPages,
                _class: 'digit',
                currentPage: currentPage
            });
        }
    }
    
    if (currentPage < totalPages) {
        paginations.push({
            content: 'mdi-chevron-right',
            _class: 'arrow',
            currentPage: currentPage
        });
    }

    return paginations;
}