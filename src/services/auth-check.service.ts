import { Injectable } from '@angular/core';
import {LocalStorageServiceService} from 'src/services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  constructor(private _localStorageService: LocalStorageServiceService) { }

  public getToken(): string {
    return this._localStorageService.getItem('auth_tokenz');
  }

  public setToken(token: any, storage = false) {
    this._localStorageService.setItem('auth_tokenz', token, storage);
  }

  public removeToken() {
    this._localStorageService.removeItem('auth_tokenz');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();

    if (token) {
      return true;
    } else {
    return false;
    }
}
}
