import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http: HttpClient) { }

  getPhoneNumbers(number, page, size):Observable<any>{
    const parameters = new HttpParams().set('phonenumber',number).set('page',page).set('size',size);
    return this.http.get(`${environment.api_url}${environment.urls.phoneNumbers}`,{params: parameters});
  }
}
