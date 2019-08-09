import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {
  public memoryStorage = {};
  constructor() { 
  }

  public getItem(item) {
    let value;

    try {
        if (localStorage) {
            value = (window.localStorage.getItem(item) ?
                window.localStorage.getItem(item) : window.sessionStorage.getItem(item)) || this.memoryStorage[item];
        } else {
            value = this.memoryStorage[item];
        }
        return value || null;
    } catch (err) {
        console.log('error');
    }
}

public setItem(item, value, storage = false) {
  try {
      if (item || item !== 'null' ) {
          if (localStorage) {
              return storage ? window.sessionStorage.setItem(item, value) : window.localStorage.setItem(item, value);
          } else {
              this.memoryStorage[item] = value;
          }
      }
  } catch (err) {
      this.memoryStorage[item] = value;
  }
}

public removeItem(item: any) {
  try {
      delete this.memoryStorage[item];
      if (window.localStorage) {
          window.localStorage.removeItem(item);
      }

      if (window.sessionStorage) {
          window.sessionStorage.removeItem(item);
      }

      return true;
  } catch (err) {}
}
}
