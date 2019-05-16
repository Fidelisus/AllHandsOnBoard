import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  // testUrl = 'https://jsonplaceholder.typicode.com/users';
  apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  /* TEST FUNCTION FROM THE PLACEHOLDER API - REQUIRES UNCOMMENTING APPCOMPONENT.TS STUFF
  getUserData(): Observable<any> {
    return this.http.get(this.testUrl);
  }
  */
  
  //for the testing
  getUser(): User{
    return {
      user_id: 41234,
      name: 'Jan',
      surname: 'Schilling',
      email: 'mail@edu.pl',
      occupation: 'Student',
      index_no: 2177,
      academic_title: '-',
      department: 'IFE',
      points: 10};
  }
  
  /*
  getUser():Observable<User>{
    return this.http.get(this.apiUrl + '/Users').map(resp => resp.json() as User);
  }
  */

  getData(): Observable<any> {
    return this.http.get(this.apiUrl + '/Login');
  }
}
