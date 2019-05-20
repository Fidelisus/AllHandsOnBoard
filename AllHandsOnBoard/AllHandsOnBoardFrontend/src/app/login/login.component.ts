import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    console.log('login on init');
    this.authService.logout();
  }

  enterHandler(login: HTMLInputElement, pass: HTMLInputElement, event: KeyboardEvent) {
    if (event.keyCode === 13) {
      /*if (this.loginAuth(login, pass)) {
        this.router.navigateByUrl('home');
      } else {
        return false;
      }*/

      this.authService.login(login.value, pass.value)
        .subscribe(res => this.authService.setSession(res),
                   err => console.error(err),
                () => { if (this.authService.isLoggedIn()) {
                  this.router.navigateByUrl('home');
                }});
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
    console.log(this.authService.login(login.value, pass.value));
    if(this.authService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  getErrorMessages(login: HTMLInputElement, pass: HTMLInputElement): string {
    if (login.value === '' || pass.value === '') {
      return 'Fields cannot be empty.';
    }
  }

  checkIfLogged() {
    console.log(this.authService.isLoggedIn());
  }
}
