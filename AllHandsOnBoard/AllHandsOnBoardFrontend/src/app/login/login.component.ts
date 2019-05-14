import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // users: User[];
  values: string[];

  constructor(private restService: RestService,
              private router: Router) { }

  ngOnInit() {
  }

  enterHandler(login: HTMLInputElement, pass: HTMLInputElement, event: KeyboardEvent): boolean {
    if (event.keyCode === 13) {
      if (this.loginAuth(login, pass)) {
        this.router.navigateByUrl('home');
      } else {
        return false;
      }
    }
  }

  clickHandler(login: HTMLInputElement, pass: HTMLInputElement): boolean {
    if (this.loginAuth(login, pass)) {
      this.router.navigateByUrl('home');
    } else {
      return false;
    }
  }

  loginAuth(login: HTMLInputElement, pass: HTMLInputElement): boolean {
    console.log(this.restService.getData()
      .subscribe(data => this.values = data));
    console.log(this.values);
    if (login.value === 'admin' && pass.value === 'admin') {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  }

  getErrorMessages(login: HTMLInputElement, pass: HTMLInputElement): string {
    if (login.value === '' || pass.value === '') {
      return 'Fields cannot be empty.';
    }
  }
  /* TEST API FUNCTION
  getinfo() {
    console.log(this.users);
  }
  */
  getinfo() {
    console.log(this.values);
  }
}
