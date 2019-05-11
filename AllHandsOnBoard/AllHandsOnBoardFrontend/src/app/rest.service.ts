import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  // testUrl = 'https://jsonplaceholder.typicode.com/users';
  apiUrl = 'localhost:5001/api';

  constructor(private http: HttpClient) { }

  /* TEST FUNCTION FROM THE PLACEHOLDER API - REQUIRES UNCOMMENTING APPCOMPONENT.TS STUFF
  getUserData(): Observable<any> {
    return this.http.get(this.testUrl);
  }
  */

  getData(): Observable<any> {
    return this.http.get(this.apiUrl + '/Login');
  }
}
