import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsService {

  constructor() {
  }

  getKeysFromObject(object: any): any[] {
    const tabKeys = [];
    for (const key of Object.keys(object)) {
      tabKeys.push(key);
      // console.log(key + ' -> ' + object[key]);
    }
    return tabKeys;
  }

  deleteElementsFromArray(data: any[], elementToRemove: any[]): any[] {
    for (const ex of elementToRemove) {
      const index = data.findIndex((item, i) => {
        return item === ex;
      });
      if (index !== -1) {
        data.splice(index, 1);
      }
    }
    return data;
  }
}
