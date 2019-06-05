import { Component, OnInit, Input } from '@angular/core';
import { User } from '../data-models/user.model';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Task } from '../data-models/task.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()
  tasksData: Task[];
  tasksNumber: number;
  user: User;
  
  constructor(private restService: RestService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.restService.getUser(parseInt(localStorage.getItem('userDBid'), 10))
      .subscribe(data => this.user = data);
    this.getData(100);
  }

  countTasks() : number {
    return this.tasksData.length;
  }

  back() {
    this.router.navigateByUrl('home');
  }

  getData(n: number, page = 1) {
    this.restService.getNTasks(n, '', [], page)
      .subscribe(data => {
        this.tasksData = [];
        const array = data as Array<any>;
        for (const item of array) {
          if (item.task.stateoftask.toUpperCase() === 'TODO') {
            item.task.stateoftask = 'W trakcie';
          }
          this.tasksData.push(new Task(item));
        }
      });
  }
}
