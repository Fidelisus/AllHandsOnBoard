import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../data-models/task.model';
import { User } from '../data-models/user.model';
import { Tags } from '../data-models/tags.model';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-task-adder',
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.css']
})
export class TaskAdderComponent implements OnInit {
  @Input()
  counter: number;
  form: FormGroup;
  task: Task;
  user: User;
  tagsData: Tags[];

  constructor(private restService:RestService,
              private router: Router,
              private auth: AuthService,
              private formBuilder: FormBuilder){
                this.form = this.formBuilder.group({
                tagsData: new FormArray([])
              });

              this.restService.getTags()
                .subscribe(tags =>{
                  this.tagsData = tags;
                })

            }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
      }

    this.restService.getUser(parseInt(localStorage.getItem('userDBid'), 10))
      .subscribe(data => this.user = data);

    }

  addCheckboxes() {
      if(this.counter == 1)
        return 0;
      this.counter = 1;
      this.tagsData.map((o, i) => {
        const control = new FormControl();
        (this.form.controls.tagsData as FormArray).push(control);
      });
    }

  back(){
    this.router.navigateByUrl('home');
  }

  giveTags(){
    this.addCheckboxes();
  }

  submit(task_description: HTMLInputElement,
        short_description: HTMLInputElement,
        points_gained: HTMLInputElement,
        work_finish_date: HTMLInputElement): boolean{
          let i: number;
          var list = [];
          for(i=0; i<this.form.value.tagsData.length; i++){
            if(this.form.value.tagsData[i] == true) {list.push(i+1);}
          }
          var date = new Date();
          /*
          console.log(list);
          this.task = {
            taskId: 20,
            uploaderId: parseInt(localStorage.getItem('userDBid'), 10),
            uploaderName: this.user.Name,
            uploaderSurname: this.user.Surname,
            uploaderEmail: this.user.Email,
            stateoftask: "",
            tags: list,
            taskDescription: task_description.value,
            taskShortDescription: short_description.value,
            pointsGained: parseInt(points_gained.value, 10),
            uploadDate: date.getTime().toString(),
            finishDate: work_finish_date.value
          };
          */

        //this.restService.addTask(this.task, list);
        return false;
  }
}
