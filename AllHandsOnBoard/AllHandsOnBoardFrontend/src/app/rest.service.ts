import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './data-models/user.model';
import { Task } from './data-models/task.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = 'http://localhost:5000/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { }

  getUser(id: number) {
    return this.http.get<User>(this.apiUrl + '/Users/' + id, this.httpOptions);
  }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl + '/Users', this.httpOptions);
  }
  
  getTask(id: number) {
    return this.http.get<Task>(this.apiUrl + '/TaskList/' + id, this.httpOptions);
  }

  getNTasks(n: number, search: string = '', tags: string[], page: number) {
    const body = {
      'numberOfTasks': n,
      'listTags': tags,
      'pageNumber': page,
      'columnToSearch': 'ShortDescription',
      'keyword': search
    };
    return this.http.post(this.apiUrl + '/TaskList', body, this.httpOptions);
  }

 addTask(task: Task, tags = []) {
    const body = {
      "task": task,
      "tags": tags
    };
    return this.http.post(this.apiUrl + '/TaskAdder', body, this.httpOptions);
  }

  applyToTask(id: number) {
    const body = {
      'taskId': id
    }
    return this.http.post(this.apiUrl + '/TaskList/apply/', body, this.httpOptions);
  }
}
