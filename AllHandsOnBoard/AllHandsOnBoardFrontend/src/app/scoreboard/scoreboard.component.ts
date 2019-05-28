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
    value.forEach((a, index, arr) => { if (a.occupation.toLowerCase() !== "student") arr.splice(index, 1)});
      this._usersData = value;
    }

  public currentUserData: User;


  constructor(private auth: AuthService,
    private rest: RestService,
    private router: Router) {
}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    console.log(+localStorage.getItem('userDBid'))
    this.getCurrentUser(+localStorage.getItem('userDBid'));
    this.getData(10);
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
    this.rest.getUser(id)
      .subscribe(user => this.currentUserData = user);
  }
}


//< div class="container-fluid" >
//  <div class="row" >
//    <div class="col-md-3" >
//      {{ currentUserData.name }}
//</div>
//  < div class="col-md-3" >
//    {{ currentUserData.surname }}
//</div>
//  < div class="col-md-5" >
//    {{ currentUserData.department }}
//</div>
//  < div class="col-md-1" >
//    {{ currentUserData.points }}
//</div>
//  < /div>
//  < /div>
