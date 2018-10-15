import { ID } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { RecomStore } from './recom.store';
import { createRecom, Item, Recom } from './recom.model';

@Injectable({
    providedIn: 'root'
})
export class RecomService {
    constructor(private recomStore: RecomStore) { }

    add(type: string, name: string, heading: Array<string>, item: Array<Item>) {
        const data = createRecom({ type, name, heading, item });
        this.recomStore.add(data);
    }

    update({id, item}: Recom) {
        this.recomStore.update(id, {item});
    }

    addJson(data: any) {
        let newItem = [];
        let itemList;
        let optionList = [];
        for (let index = 0; index < data.length; index++) {
            if (data[index].recom.type === 'section') {
                for (let item = 0; item < data[index].recom.item.length; item++) {

                    for (let option = 0; option < data[index].recom.item[item].stateoption.length; option++) {
                        optionList.push(data[index].recom.item[item].stateoption[option]);
                    }

                    if (data[index].recom.item[item].name === 'Overall') {
                        itemList = {
                            name: '',
                            type: data[index].recom.item[item].type,
                            state: data[index].recom.item[item].state,
                            stateOption: optionList,
                            impression: data[index].recom.item[item].impression
                        };
                    } else {
                        itemList = {
                            name: data[index].recom.item[item].name,
                            type: data[index].recom.item[item].type,
                            state: data[index].recom.item[item].state,
                            stateOption: optionList,
                            impression: data[index].recom.item[item].impression
                        };
                    }
                    newItem.push(itemList);
                }

                this.add(data[index].recom.type,
                    data[index].recom.name,
                    [],
                    newItem);
                optionList = [];
                newItem = [];

            } else if (data[index].recom.type === 'statement') {
                for (let item = 0; item < data[index].recom.item.length; item++) {
                    itemList = {
                        name: '',
                        type: '',
                        state: data[index].recom.item[item].state,
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

                for (let item = 0; item < data[index].recom.item.length; item++) {
                    console.log('table', data[index].recom.item);
                    itemList = {
                        state: '',
                        stateOption: data[index].recom.item,
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

