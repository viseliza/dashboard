import type { PaginationStrategy } from "~/types";
import type { PaginationParams } from '~/types';

export class DigitStrategy implements PaginationStrategy {
    getPage(args: PaginationParams): number {
        const { content, _class, currentPage } = args;

        return content as number;
    }
}