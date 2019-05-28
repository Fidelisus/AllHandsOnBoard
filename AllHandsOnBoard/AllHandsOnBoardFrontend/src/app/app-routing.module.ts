import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {TaskListComponent} from './task-list/task-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { TaskAdderComponent } from './task-adder/task-adder.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'task-adder', component: TaskAdderComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
