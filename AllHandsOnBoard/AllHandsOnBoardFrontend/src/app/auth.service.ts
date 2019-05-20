import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:5000/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(email: string, pass: string) {
    const body = {
      Email: email,
      Password: pass
    };
    return this.http.post(this.apiUrl + '/Login', JSON.stringify(body), this.httpOptions);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn(): boolean {
    //return moment().isBefore(this.getExpirationDate());
    if (localStorage.getItem('token') === null) {
      return false;
    } else {
      return true;
    }
  }

  setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'seconds');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getExpirationDate() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
