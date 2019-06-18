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
    return this.http.get<Tags[]>(this.apiUrl + '/Tags/', this.getHttpOptions());
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

  addTask(task: ShortTask, tags = []) {
    const body = {
      'task': {
        'taskId': task.taskId,
        'stateoftask': 'TODO',
        'uploaderId': task.uploaderId,
        'taskDescription': task.taskDescription,
        'shortDescription': task.shortDescription,
        'pointsGained': task.pointsGained,
        'noOfStudents': task.noOfStudents,
        'uploadDate': null,
        'workFinishDate': task.workFinishDate,
        'signingFinishDate': task.signingFinishDate,
        //'workStartDate': task.workStartDate
      },
      'tags': tags
    };
    return this.http.post(this.apiUrl + '/TaskAdder', body, this.getHttpOptions());
  }

  applyToTask(id: number) {
    const body = {
      'taskId': id
    }
    return this.http.post(this.apiUrl + '/TaskList/apply/', body, this.getHttpOptions());
  }

  validateTask(taskId: number, studentId: number[], grade: number[]) {
    const body = {
      'taskId': taskId,
      'studentId': studentId,
      'rating': grade
    }
    return this.http.post(this.apiUrl + '/TaskList/validation/', body, this.getHttpOptions());
  }

  selectStudents(taskId: number, studentId: number[]){
    const body = {
      'taskId': taskId,
      'studentId': studentId
    }
    return this.http.post(this.apiUrl + '/TaskList/selection/', body, this.getHttpOptions());
  }

  getActiveTasks() {
    return this.http.get<ShortTask[]>(this.apiUrl + '/Users/applied', this.getHttpOptions());
  }

  getTaskHistory() {
    return this.http.get<ShortTask[]>(this.apiUrl + '/Users/history', this.getHttpOptions());
  }
}
