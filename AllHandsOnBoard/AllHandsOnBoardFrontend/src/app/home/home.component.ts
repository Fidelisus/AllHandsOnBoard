import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blueContent: string;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    if (localStorage.getItem('role') === 'student') {
      this.blueContent = 'Rewards';
    } else if (localStorage.getItem('role') === 'teacher') {
      this.blueContent = 'Add task';
    } else {
      this.blueContent = 'Administration panel';
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }

  goToProfile() {
    this.router.navigateByUrl('profile');
  }
}
