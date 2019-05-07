import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  enterHandler(login: HTMLInputElement, pass: HTMLInputElement, event: KeyboardEvent): boolean {
    if (event.keyCode === 13) {
      return this.loginAuth(login, pass);
    }
  }

  clickHandler(login: HTMLInputElement, pass: HTMLInputElement): boolean {
    return this.loginAuth(login, pass);
  }

  loginAuth(login: HTMLInputElement, pass: HTMLInputElement): boolean {
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
      return 'Fields cannot be empty.'
    }
  }
}
