import type { Streak } from '~/models';
import type { Account } from '~/models';


export type DumpResult = {
    data: Array<Streak | Account>;
    count: number;
}