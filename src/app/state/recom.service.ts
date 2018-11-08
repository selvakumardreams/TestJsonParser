import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { RecomStore } from './recom.store';
import { createRecom, Item, Recom } from './recom.model';
import { RecomQuery } from './recom.query';

@Injectable({
    providedIn: 'root'
})
export class RecomService {
    constructor(private recomStore: RecomStore,
        private recomQuery: RecomQuery) { }

    queryData: Recom;

    add(type: string, name: string, heading: Array<string>, items: Array<Item>) {
        const data = createRecom({ type, name, heading, items });
        this.recomStore.add(data);
    }

    update(id: string, result: string, itemId: number) {
        this.queryData = this.recomQuery.getEntity(id);
        this.recomStore.update(id, this.updateVeryNestedField(this.queryData, result, itemId));
    }

    updateVeryNestedField(state: Recom, result: string, itemId: number) {
        const newState = state;
        console.log('updateVeryNestedField', itemId);
        return {
            ...newState,
            items: newState.items.map((item, index) => index === itemId ? { ...item, state: result } : item)
        };
    }

    updateTableContent(id: string, result: string, i: number, j: number) {
        this.queryData = this.recomQuery.getEntity(id);
        this.recomStore.update(id, this.updateTableNestedField(this.queryData, result, i, j));

    }

    updateTableNestedField(state: Recom, result: string, i: number, j: number) {
        const newState = state;
        console.log('updateVeryNestedField', i);
        return {
            ...newState,
            items: newState.items.map((item, index) => index === j ? { ...item, stateOption: result } : item)
        };
    }

    getItemValue(state, result) {
        return state.item.map((item, index) => {
            if (item.id === 0) {
                return {
                    state: result
                };
            }
        });
    }

    addJson(data: any) {
        let newItem = [];
        let itemList;
        let optionList = [];
        for (let index = 0; index < data.length; index++) {
            if (data[index].recom.type === 'section') {
                for (let item = 0; item < data[index].recom.items.length; item++) {

                    for (let option = 0; option < data[index].recom.items[item].stateoptions.length; option++) {
                        optionList.push(data[index].recom.items[item].stateoptions[option].state);
                    }

                    if (data[index].recom.items[item].name === 'Overall') {
                        itemList = {
                            stateId: item,
                            name: '',
                            type: data[index].recom.items[item].type,
                            state: data[index].recom.items[item].state,
                            stateOption: optionList,
                            impression: data[index].recom.items[item].impression
                        };
                    } else {
                        itemList = {
                            stateId: item,
                            name: data[index].recom.items[item].name,
                            type: data[index].recom.items[item].type,
                            state: data[index].recom.items[item].state,
                            stateOption: optionList,
                            impression: data[index].recom.items[item].impression
                        };
                    }
                    newItem.push(itemList);
                    optionList = [];
                }

                this.add(data[index].recom.type,
                    data[index].recom.name,
                    [],
                    newItem);
                newItem = [];

            } else if (data[index].recom.type === 'statement') {
                for (let item = 0; item < data[index].recom.items.length; item++) {
                    itemList = {
                        name: '',
                        type: '',
                        state: data[index].recom.items[item].state,
                        stateOption: '',
                        impression: ''
                    };
                    newItem.push(itemList);
                    this.add(data[index].recom.type,
                        data[index].recom.name,
                        [],
                        newItem);
                    newItem = [];
                }
            } else {
                for (let option = 0; option < data[index].recom.heading.length; option++) {
                    optionList.push(data[index].recom.heading[option]);
                }

                for (let item = 0; item < data[index].recom.items.length; item++) {
                    itemList = {
                        state: '',
                        stateOption: data[index].recom.items,
                        impression: ''
                    };

                }
                newItem.push(itemList);
                this.add(data[index].recom.type,
                    data[index].recom.name,
                    optionList,
                    newItem);
                optionList = [];
                newItem = [];
            }

        }
    }

}

