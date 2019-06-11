import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './data-models/user.model';
import { Task, ShortTask } from './data-models/task.model';
import { Tags } from './data-models/tags.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = 'http://localhost:5000/api';


  constructor(private http: HttpClient) { }

  getHttpOptions() {
    return  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  getUser(id: number) {
    return this.http.get<User>(this.apiUrl + '/Users/' + id, this.getHttpOptions());
  }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl + '/Users', this.getHttpOptions());
  }
  
  getTask(id: number) {
    return this.http.get<Task>(this.apiUrl + '/TaskList/' + id, this.getHttpOptions());
  }

  getTags(){
    return this.http.get<Tags[]>(this.apiUrl + '/Tags/', this.httpOptions);
  }

  getNTasks(n: number, search: string = '', tags: string[], page: number) {
    const body = {
      'numberOfTasks': n,
      'listTags': tags,
      'pageNumber': page,
      'columnToSearch': 'ShortDescription',
      'keyword': search
    };
    return this.http.post(this.apiUrl + '/TaskList', body, this.getHttpOptions());
  }

 addTask(task: Task, tags = []) {
    const body = {
      "task": task,
      "tags": tags
    };
   return this.http.post(this.apiUrl + '/TaskAdder', body, this.getHttpOptions());
  }

  applyToTask(id: number) {
    const body = {
      'taskId': id
    }
    return this.http.post(this.apiUrl + '/TaskList/apply/', body, this.getHttpOptions());
  }

  getActiveTasks() {
    return this.http.get<ShortTask[]>(this.apiUrl + '/Users/applied', this.getHttpOptions());
  }

  getTaskHistory() {
    return this.http.get<ShortTask[]>(this.apiUrl + '/Users/history', this.getHttpOptions());
  }
}
