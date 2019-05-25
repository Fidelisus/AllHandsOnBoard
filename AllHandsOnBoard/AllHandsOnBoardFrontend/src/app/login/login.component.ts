import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl('home');
    }
  }

  enterHandler(login: HTMLInputElement, pass: HTMLInputElement, event: KeyboardEvent) {
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
    this.authService.login(login.value, pass.value);
    return this.authService.isLoggedIn();
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
