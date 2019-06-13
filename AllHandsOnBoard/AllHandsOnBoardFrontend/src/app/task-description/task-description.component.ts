import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { AuthService } from '../auth.service';
import { User } from '../data-models/user.model';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.css']
})
export class TaskDescriptionComponent implements OnInit {

  task;
  blueContent: string;
  applicants: User[];
  id: number;

  constructor(private restService: RestService,
              private router: Router,
              private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('taskid'), 10);
    console.log(this.id);
    this.restService.getTask(this.id)
      .subscribe(data => this.task = data, error1 => console.error(error1), () => this.applicants = this.task.applied);

    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
      }
    if (localStorage.getItem('role') === 'student') {
        this.blueContent = 'Apply';
    } else {
        this.blueContent = 'Validate';
    }
  }

  back() {
    if (localStorage.getItem('previousPage') == 'profile')
      this.router.navigateByUrl('profile');
    else
      this.router.navigateByUrl('task-list');
  }

  home() {
    this.router.navigateByUrl('home');
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

  getCurrentUserId(): number {
    return +localStorage.getItem('userDBid');
  }

  validate(userId: number, grade: number) {
    if (this.task.task.uploaderId == this.getCurrentUserId()) {
      console.log('Validating');
      this.restService.validateTask(this.id, userId, grade)
        .subscribe(next => console.log(next));
    }
  }
}
