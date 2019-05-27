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
  // TODO backend controller to return only students
  // TODO current user
  private _usersData: User[];
  public get usersData(): User[] {
    if (this._usersData != null) {
      this._usersData.sort((a, b) => {
        return b.points - a.points
      });
    }
        return this._usersData;
    }
  public set usersData(value: User[]) {
        this._usersData = value;
    }

  currentUserData: User;

  constructor(private auth: AuthService,
    private rest: RestService,
    private router: Router) {
}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.getData(10);
   // this.getCurrentUser(+localStorage.getItem('userId'));
  }

  isStudent(user : User): boolean {
    if (user.occupation.toLowerCase() == "student") {
      return true;
    } else {
      return false;
    }
  }

  getData(n: number, page = 1): void {
    this.rest.getUsers()
      .subscribe(users => this.usersData = users);
  }

  getCurrentUser(id: number): void {
    this.rest.getUser(id).subscribe(User =>  this.currentUserData = User );
  }
}
