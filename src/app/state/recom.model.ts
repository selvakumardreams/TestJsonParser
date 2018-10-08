import { ID, guid } from '@datorama/akita';

export interface Recom {
    id: ID;
    type: string;
    name: string;
    state: string;
    impression: string;
}

export function createRecom({type, name, state, impression}: Partial<Recom>) {
    return {
        id: guid(),
        type,
        name,
        state,
        impression
    } as Recom;
}
