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
  tagsToSearch: string[];
  tags = [];

  constructor(private auth: AuthService,
              private rest: RestService,
              private router: Router) {
    this.tags = [
      {id: 1, name: 'IT', isSelected: false},
      {id: 2, name: 'Maths', isSelected: false},
      {id: 3, name: 'Physics', isSelected: false},
      {id: 4, name: 'Chemistry', isSelected: false},
      {id: 5, name: 'Electronics', isSelected: false},
      {id: 6, name: 'Teaching', isSelected: false},
      {id: 7, name: 'Presentations', isSelected: false},
      {id: 8, name: 'Forein languages', isSelected: false},
      {id: 9, name: 'Erasmus students', isSelected: false},
      {id: 10, name: 'Conferences', isSelected: false},
      {id: 11, name: 'Physical', isSelected: false},
      {id: 12, name: 'Sport', isSelected: false}
    ];
    this.tagsToSearch = [];
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.getData(10);
  }
  
  back() {
    this.router.navigateByUrl('home');
  }

  back() {
    this.router.navigateByUrl('home');
  }

  searchTag(state: boolean, tag) {
    const current = this.tags.find(obj => obj === tag);
    current.isSelected = !current.isSelected;
    this.tagsToSearch = this.tags.filter(obj => obj.isSelected).map(obj => obj.id);
    this.getData(10);
  }

  searchMatch() {
    this.getData(10);
  }

  updateSearch(input: string) {
    this.searchFor = input;
  }

  getData(n: number, page = 1) {
    this.rest.getNTasks(n, this.searchFor, this.tagsToSearch, page)
      .subscribe(data => {
        this.tasksData = [];
        const array = data as Array<any>;
        for (const item of array) {
          this.tasksData.push(new Task(item));
        }
      });
  }
}
