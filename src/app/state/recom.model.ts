import { ID, guid } from '@datorama/akita';

export interface Recom {
    id: ID;
    type: string;
    name: string;
    heading?: Array<string>;
    item?: Array<Item>;
}

export interface Item {
    id: number;
    name: string;
    type?: string;
    state?: string;
    stateOption?: Array<string>;
    impression?: string;
}

export function createRecom({type, name, heading, item}: Partial<Recom>) {
    return {
        id: guid(),
        type,
        name,
        heading,
        item
    } as Recom;
}
