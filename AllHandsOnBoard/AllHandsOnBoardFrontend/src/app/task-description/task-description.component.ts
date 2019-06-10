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
    this.router.navigateByUrl('home');
  }

  checker() {
    if (localStorage.getItem('role') === 'student') {
      console.log(`apply`);
      console.log(this.task);
      this.apply();
    } else {
      console.log(`validate`);
    }
  }

  apply() {
    this.restService.applyToTask(this.task.task.taskId)
      .subscribe(next => console.log(next));
  }
}
