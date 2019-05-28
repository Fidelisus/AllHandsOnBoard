import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestService } from './rest.service';
import { TaskListComponent } from './task-list/task-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './auth.service';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { TaskAdderComponent } from './task-adder/task-adder.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskListComponent,
    LoginComponent,
    ProfileComponent,
    ScoreboardComponent,
    TaskAdderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RestService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
