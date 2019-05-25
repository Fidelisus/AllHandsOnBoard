import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';
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
              private auth: AuthService){
    //restService.getUser().subscribe(User => {this.user = User});
    this.user = restService.getUser();
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
  }

}
