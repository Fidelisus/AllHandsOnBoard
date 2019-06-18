import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { Task } from '../data-models/task.model';
import { Tags } from '../data-models/tags.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasksData: Task[];
  searchFor = '';
  tagsToSearch: string[];
  tagsData: Tags[];
  tags = [];
  allTasks = 100;
  page = 1;

  constructor(private auth: AuthService,
              private rest: RestService,
              private router: Router) {
  }

  ngOnInit() {
    this.rest.getTags()
      .subscribe(data => this.tagsData = data, error1 => console.log(error1), () => {
        for (const tag of this.tagsData) {
          this.tags.push({ id: tag.tagId, name: tag.tagDescription, isSelected: false });
        }
      });
    this.tagsToSearch = [];
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.getData(this.allTasks);
  }

  back() {
    this.router.navigateByUrl('home');
  }

  searchTag(state: boolean, tag) {
    const current = this.tags.find(obj => obj === tag);
    current.isSelected = !current.isSelected;
    this.tagsToSearch = this.tags.filter(obj => obj.isSelected).map(obj => obj.id);
    this.getData(this.allTasks);
  }

  searchMatch() {
    this.getData(this.allTasks);
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
        this.tasksData.sort((a, b) => { return a.taskId - b.taskId; });
      });
  }
  
  description(task: Task){
    this.router.navigateByUrl('task-list/' + task.taskId);
    localStorage.setItem('previousPage', 'task-list');
  }
}
