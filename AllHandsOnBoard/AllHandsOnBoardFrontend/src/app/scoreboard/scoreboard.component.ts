import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { User } from '../data-models/user.model';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})


export class ScoreboardComponent implements OnInit {
  private _usersData: User[];
  public get usersData(): User[] {
        return this._usersData;
    }
  public set usersData(value: User[]) {
      this._usersData = value;
    }

  public currentUserPlace: number;

  constructor(private auth: AuthService,
    private rest: RestService,
    private router: Router) {
}

  back(){
    this.router.navigateByUrl('home');
  }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.getData(10);
  }

  isStudentLogged(): boolean {
    if (localStorage.getItem('role') == "student") {
      return true;
    } else {
      return false;
    }
  }

  isStudent(user: User): boolean {
    if (user.Occupation.toLowerCase() == "student") {
      return true;
    } else {
      return false;
    }
  }

  getData(n: number, page = 1): void {
    this.rest.getUsers()
      .subscribe(users => {
        this.usersData = users;
        this._usersData.forEach((a, index, arr) => { if (a.Occupation.toLowerCase() != "student") arr.splice(index, 1) });
        this._usersData.forEach((a, index, arr) => { if (a.Occupation.toLowerCase() != "student") arr.splice(index, 1) });
        if (true) {
          this._usersData.sort((a, b) => {
            return b.Points - a.Points;
          });
        }
      },
        err => console.error('Observer got an error: ' + err),
        () => {
          this.getCurrentUserPlace();
        }
    );
  }

  getCurrentUserId(): number {
    return +localStorage.getItem('userDBid');
  }

  getCurrentUserPlace(): void {
    if (this._usersData != null) {
      this._usersData.forEach((a, index, arr) => { if (a.UserId != this.getCurrentUserId()) this.currentUserPlace = index; });
    }
  }
}
