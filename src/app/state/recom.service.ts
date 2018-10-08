import { ID } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { RecomStore } from './recom.store';
import { createRecom } from './recom.model';

@Injectable({
    providedIn: 'root'
})
export class RecomService {
    constructor(private recomStore: RecomStore) { }

    add(type: string, name: string, state: string, impression: string) {
        const data = createRecom({ type, name, state, impression });
        this.recomStore.add(data);
    }

}
