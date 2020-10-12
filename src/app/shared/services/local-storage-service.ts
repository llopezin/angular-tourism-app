import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  add(value, item) {
    let storedItem: any = localStorage.getItem(item);
    let itemArr = storedItem ? JSON.parse(storedItem) : [];

    if (itemArr.indexOf(value) > -1) return false;

    itemArr.push(value);
    localStorage.setItem(item, JSON.stringify(itemArr));
    return true;
  }

  get(item) {
    return JSON.parse(localStorage.getItem(item));
  }
}
