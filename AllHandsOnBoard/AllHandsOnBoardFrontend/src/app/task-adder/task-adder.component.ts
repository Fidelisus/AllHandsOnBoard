import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../data-models/task.model';
import { User } from '../data-models/user.model';
import { Tags } from './tags.interface';
import { Router } from '@angular/router';
import { TagarrayService } from './tagarray.service';
import { RestService } from '../rest.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-task-adder',
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.css']
})
export class TaskAdderComponent implements OnInit {
  @Input()
  task: Task;
  user: User;
  public tags: Tags;

  constructor(private restService:RestService,
              private router: Router,
              private auth: AuthService,
              private ta: TagarrayService){}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
      }
    this.tags = {
      isIt: false,
      isMaths: false,
      isPhysics: false,
      isChemistry: false,
      isElectronics: false,
      isTeaching: false,
      isPresentations: false,
      isForeign_languages: false,
      isErasmus_students: false,
      isConferences: false,
      isPhysical: false,
      isSport: false
    }
    this.restService.getUser(parseInt(localStorage.getItem('userDBid'), 10))
      .subscribe(data => this.user = data);
    }

  back(){
    this.router.navigateByUrl('home');
  }

  submit(task_description: HTMLInputElement,
        short_description: HTMLInputElement,
        points_gained: HTMLInputElement,
        work_finish_date: HTMLInputElement): boolean{
          var list = [];
          list = this.ta.calculate(this.tags);
          var date = new Date();
          this.task = {
            taskId: 20,
            uploaderId: parseInt(localStorage.getItem('userDBid'), 10),
            uploaderName: this.user.name,
            uploaderSurname: this.user.surname,
            uploaderEmail: this.user.email,
            tags: [],
            taskDescription: task_description.value,
            taskShortDescription: short_description.value,
            pointsGained: parseInt(points_gained.value, 10),
            uploadDate: date.getTime().toString(),
            finishDate: work_finish_date.value
          };

        console.log(this.task);
        this.restService.addTask(this.task, list);
        return false;
  }
}
