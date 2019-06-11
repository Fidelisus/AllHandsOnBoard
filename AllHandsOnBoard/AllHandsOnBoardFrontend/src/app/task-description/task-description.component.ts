import { Component, OnInit} from '@angular/core';
import { Task } from '../data-models/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.css']
})
export class TaskDescriptionComponent implements OnInit {

  task;
  blueContent: string;

  constructor(private restService: RestService,
              private router: Router,
              private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('taskid'), 10);
    console.log(id);
    this.restService.getTask(id)
      .subscribe(data => this.task = data);

    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
      }
    if (localStorage.getItem('role') === 'student') {
        this.blueContent = 'Apply';
    } else {
        this.blueContent = 'Validate';
    }
  }

  back(){
    this.router.navigateByUrl('task-list');
  }

  home(){
    console.log(this.task.applied);
    //this.router.navigateByUrl('home');
  }

  isStudent() {
    if (localStorage.getItem('role') === 'student') {
      return true;
    } else {
      return false;
    }
  }

  isTeacher() {
    if (localStorage.getItem('role') === 'teacher') {
      return true;
    } else {
      return false;
    }
  }

  apply() {
    this.restService.applyToTask(this.task.task.taskId)
      .subscribe(next => console.log(next));
  }
}
