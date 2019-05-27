import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { Task } from '../data-models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasksData: Task[];
  searchFor = '';
  tags = ['IT', 'Maths', 'Physics'];

  constructor(private auth: AuthService,
              private rest: RestService,
              private router: Router) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.getData(5);
  }

  searchTag(state: boolean, tag: string) {
    console.log(tag + ' ' + state);
  }

  searchMatch(taskTitle: string): boolean {
    const regex = new RegExp(this.searchFor, 'gi');
    if (this.searchFor === '') {
      return true;
    } else if (taskTitle.match(regex) !== null) {
      return true;
    } else {
      return false;
    }
  }

  updateSearch(input: string) {
    this.searchFor = input;
  }

  getData(n: number, tags = [], page = 1) {
    this.rest.getNTasks(n, tags, page)
      .subscribe(data => {
        this.tasksData = [];
        const array = data as Array<any>;
        for (const item of array) {
          this.tasksData.push(new Task(item));
        }
      });
  }
}
