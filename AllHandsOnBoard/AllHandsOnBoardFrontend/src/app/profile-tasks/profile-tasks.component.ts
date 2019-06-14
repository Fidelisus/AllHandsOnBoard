import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Task, ShortTask } from '../data-models/task.model';

@Component({
  selector: 'app-profile-tasks',
  templateUrl: './profile-tasks.component.html',
  styleUrls: ['./profile-tasks.component.css']
})
export class ProfileTasksComponent implements OnInit {
  tasksData: ShortTask[];
  tasksNumber: number;

  constructor(private restService: RestService,
              private router: Router,
              private auth: AuthService) {
  }

  ngOnInit() {
    if (localStorage.getItem('role') === 'teacher')
      this.getTaskHistory(100);
    else
      this.getTasksActive(100);
  }

  countTasks(): void {
    this.tasksNumber = this.tasksData.length;
  }

  isStudent(): boolean {
    if (localStorage.getItem('role') === 'student')
      return true;
    else
      return false;
  }

  getTaskHistory(n: number, page = 1) {
    this.restService.getTaskHistory()
      .subscribe(data => {
          this.tasksData = [];
          const array = data as Array<any>;
          for (const item of array) {
            if (item.stateoftask.toUpperCase() === 'TODO') {
              item.stateoftask = 'In progress';
            }
            this.tasksData.push(new ShortTask(item));
          }
          console.log(this.tasksData);
        },
        err => console.error('Observer got an error: ' + err),
        () => {
          this.countTasks();
        }
      );
  }

  getTasksActive(n: number, page = 1) {
    this.restService.getActiveTasks()
      .subscribe(data => {
          this.tasksData = [];
          const array = data as Array<any>;
          for (const item of array) {
            if (item.stateoftask.toUpperCase() === 'TODO') {
              item.stateoftask = 'In progress';
            }
            this.tasksData.push(new ShortTask(item));
          }
          console.log(this.tasksData);
        },
        err => console.error('Observer got an error: ' + err),
        () => {
          this.countTasks();
        }
      );
  }

  description(task: Task) {
    this.router.navigateByUrl('task-list/' + task.taskId);
    localStorage.setItem('previousPage', 'profile');
  }
}
