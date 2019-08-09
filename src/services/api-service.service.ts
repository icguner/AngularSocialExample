import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl: any = 'http://localhost:8000/api/';
  token: any;
  constructor(private http: HttpClient, private localStorage: LocalStorageServiceService) { }

    postData(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.localStorage.getItem('auth_tokenz'),
      })
    };
    return this.http.post(this.baseUrl + url + '/', data, httpOptions);
    }

    getData(url) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*',
              // tslint:disable-next-line: object-literal-key-quotes
              'Authorization': 'Bearer ' + this.localStorage.getItem('auth_tokenz')
            })
          };
        return this.http.get(this.baseUrl + url + '/', httpOptions);
    }

    putData(url, data) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*',
              // tslint:disable-next-line: object-literal-key-quotes
              'Authorization': 'Bearer ' + this.localStorage.getItem('auth_tokenz')
            })
          };
        return this.http.put(this.baseUrl + url + '/', data, httpOptions);
    }
}
