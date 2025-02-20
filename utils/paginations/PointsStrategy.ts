import type { PaginationStrategy } from "~/types";
import type { PaginationParams } from '~/types';

export class PointsStrategy implements PaginationStrategy {
    getPage(args: PaginationParams): number {
        const { content, _class, currentPage } = args;
        const side = _class.split(' ')[1];

        return side === 'left' 
            ? currentPage - 2
            : currentPage + 2;
    }
}