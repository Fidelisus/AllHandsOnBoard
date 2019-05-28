import { Component, OnInit, Input } from '@angular/core';
import { User } from '../data-models/user.model';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()
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
  }

  back() {
    this.router.navigateByUrl('home');
  }
}
