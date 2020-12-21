import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsService {

  constructor() {
  }

  // for spread Operator
  spread(data: any, newElement: any = null): any[] {
    if (newElement) {
      return [newElement, ...data];
    }
    return [...data];
  }

  // for assign new object
  objectAssign(object): any {
    return Object.assign({}, object);
  }

  // for get Keys from Object
  getKeysFromObject(object: any): any[] {
    const tabKeys = [];
    for (const key of Object.keys(object)) {
      tabKeys.push(key);
      // console.log(key + ' -> ' + object[key]);
    }
    return tabKeys;
  }

  // for delete one element from array
  deleteElementFromArray(data: any[], element: any): any {
    const index = data.findIndex((item, i) => {
      return item === element;
    });
    if (index !== -1) {
      data.splice(index, 1);
    }
    return data;
  }

  // for delete multiple element from array
  deleteElementsFromArray(data: any[], elementToRemove: any[]): any[] {
    for (const el of elementToRemove) {
      data = this.deleteElementFromArray(data, el);
    }
    return data;
  }

  // for modify Object element from Array By Key
  modifyObjectElementFromArrayByKey(data: any[], element: any, key: string): any {
    return data.map(item => {
      if (element[key] === item[key]) {
        item = element;
      }
      return item;
    });
  }

  // for delete Object element from Array By Key
  deleteObjectElementFromArrayByKey(data: any[], element: any, key: string): any {
    const index = data.findIndex((item, i) => {
      return element[key] === item[key];
    });
    if (index !== -1) {
      data.splice(index, 1);
    }
    return data;
  }

  // for Add element to Object
  addElementToObject(object: any, key: string, value: any): any {
    object[key] = value;
    return object;
  }

  // for delete element from object
  deleteElementFromObjectByKey(object: any, key: string): any {
    delete object[key];
    return object;
  }
}
