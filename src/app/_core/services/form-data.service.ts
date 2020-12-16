import {Injectable} from '@angular/core';
import {JsService} from './js.service';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private jsService: JsService) {
  }

  getFormData(data, except: string[] = []): FormData {
    const formData = new FormData();
    let keys = this.jsService.getKeysFromObject(data);
    if (except.length > 0) {
      keys = this.jsService.deleteElementsFromArray(keys, except);
    }
    for (const key of keys) {
      formData.append(key, data[key]);
    }
    return formData;
  }

  showFormDataInConsole(formData: FormData): void {
    formData.forEach((value, key) => {
      console.log(key + ' * ' + value);
    });
  }
}
