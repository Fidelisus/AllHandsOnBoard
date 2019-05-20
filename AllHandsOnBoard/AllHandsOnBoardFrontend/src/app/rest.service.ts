import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = 'http://localhost:5000/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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
}
