import { ID, guid } from '@datorama/akita';

export interface Recom {
    id: ID;
    type: string;
    item: string;
    state: string;
    impression: string;
}

export function createRecom({type, item, state, impression}: Partial<Recom>) {
    return {
        id: guid(),
        type,
        item,
        state,
        impression
    } as Recom;
}
