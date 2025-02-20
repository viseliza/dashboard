import type { PaginationStrategy } from "~/types";
import type { PaginationParams } from '~/types';

export class ArrowStrategy implements PaginationStrategy {
    getPage(args: PaginationParams): number {
        const { content, _class, currentPage } = args;
        const side = content.toString().split('-')[2];
        
        return side === 'left' 
            ? currentPage - 1
            : currentPage + 1;
    }
}