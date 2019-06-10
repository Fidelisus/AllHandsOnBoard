import { Component, OnInit, Input } from '@angular/core';
import { User } from '../data-models/user.model';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Task } from '../data-models/task.model';

enum state {
  PROFILE,
  ACTIVE_TASKS,
  TASK_HISTORY
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  @Input()
  user: User;

  get state() { return state; }
  buttonState: state;
  
  constructor(private restService: RestService,
              private router: Router,
    private auth: AuthService) {
    this.buttonState = state.PROFILE
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.restService.getUser(parseInt(localStorage.getItem('userDBid'), 10))
      .subscribe(data => this.user = data);
  }

  back() {
    this.router.navigateByUrl('home');
  }

  setButtonState(s: state): void {
    console.log("jazda");
    this.buttonState = s;
  }
}
