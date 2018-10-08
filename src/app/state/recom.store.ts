import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Recom } from 'src/app/state/recom.model';

export interface State extends EntityState<Recom> { }

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'recoms' })
export class RecomStore extends EntityStore<State, Recom> {
    constructor() {
        super();
    }
}
