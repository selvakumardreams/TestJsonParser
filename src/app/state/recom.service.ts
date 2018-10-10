import { ID } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { RecomStore } from './recom.store';
import { createRecom } from './recom.model';

@Injectable({
    providedIn: 'root'
})
export class RecomService {
    constructor(private recomStore: RecomStore) { }

    add(type: string, item: string, state: string, impression: string) {
        const data = createRecom({ type, item, state, impression });
        this.recomStore.add(data);
    }

    addJson(data: any) {
        for (let index = 0; index < data.length; index++) {
            if (data[index].recom.type === 'section') {
                for (let item = 0; item < data[index].recom.item.length; item++) {
                    if (data[index].recom.item[item].name === 'Overall') {
                        this.add(data[index].recom.name,
                            '',
                            data[index].recom.item[item].state,
                            data[index].recom.item[item].impression);
                    } else {
                        this.add(data[index].recom.name,
                            data[index].recom.item[item].name,
                            data[index].recom.item[item].state,
                            data[index].recom.item[item].impression);
                    }
                }
            } else if (data[index].recom.type === 'statement') {
                for (let item = 0; item < data[index].recom.item.length; item++) {
                    this.add(data[index].recom.name,
                        data[index].recom.item[item].name,
                        data[index].recom.item[item].state,
                        data[index].recom.item[item].impression);
                }
            } else {
                for (let item = 0; item < data[index].recom.item.length; item++) {
                    this.add(data[index].recom.name,
                        data[index].recom.item[item].name,
                        data[index].recom.item[item].state,
                        data[index].recom.item[item].impression);
                }
            }

        }
    }

}
