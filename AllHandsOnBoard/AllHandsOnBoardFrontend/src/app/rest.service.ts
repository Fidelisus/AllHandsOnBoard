import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }
  
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

  getData(): Observable<any> {
    return this.http.get(this.apiUrl + '/Login');
  }

  getToken(id: string, pass: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.patch(this.apiUrl + '/Login',
      {
        Email: id,
        Password: pass
      });
  }
}
