import { ID, guid } from '@datorama/akita';

export interface Recom {
    id: ID;
    type: string;
    name: string;
    heading?: Array<string>;
    items?: Array<Item>;
}

export interface Item {
    id: number;
    name: string;
    type?: string;
    state?: string;
    stateoptions?: Array<string>;
    impression?: string;
}

export function createRecom({type, name, heading, items}: Partial<Recom>) {
    return {
        id: guid(),
        type,
        name,
        heading,
        items
    } as Recom;
}
