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
      'Authentication': 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { }

  //for the testing
  getUserTest(): User {
    return {
      userId: 41234,
      name: 'Jan',
      surname: 'Schilling',
      email: 'mail@edu.pl',
      occupation: 'Student',
      indexNo: 2177,
      academicTitle: '-',
      department: 'IFE',
      points: 10,
      token: "",
      taskAggregation: "",
      tasks: "",
      password: ""
    };
  }

  getUser(id: number) {
    console.log(this.apiUrl + '/Users/' + id);
    return this.http.get<User>(this.apiUrl + '/Users/' + id, this.httpOptions);
  }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl + '/Users', this.httpOptions);
  }

  getNTasks(n: number, tags = [], page: number) {
    const body = {
      'numberOfTasks': n,
      'listTags': tags,
      'pageNumber': page,
      "columnToSearch": "ShortDescription",
      "keyword": "a"
    };
    return this.http.post(this.apiUrl + '/TaskList', body, this.httpOptions);
  }
  
  addTask(task: Task){
    return this.http.post(this.apiUrl + '/TaskAdder', JSON.stringify(task), this.httpOptions);
  }
}
