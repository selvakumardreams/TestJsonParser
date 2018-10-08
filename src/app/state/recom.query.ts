import { QueryEntity } from '@datorama/akita';
import { Recom } from './recom.model';
import { Injectable } from '@angular/core';
import { State, RecomStore } from 'src/app/state/recom.store';

@Injectable({
    providedIn: 'root'
  })
export class RecomQuery extends QueryEntity<State, Recom> {
    constructor(protected store: RecomStore) {
        super(store);
    }
}
