import { Component, OnInit, Input } from '@angular/core';
import { Task, ShortTask } from '../data-models/task.model';
import { User } from '../data-models/user.model';
import { Tags } from '../data-models/tags.model';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { concat } from 'rxjs';

@Component({
  selector: 'app-task-adder',
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.css']
})
export class TaskAdderComponent implements OnInit {
  @Input()
  counter: number;
  form: FormGroup;
  task: ShortTask;
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

  validate(task: ShortTask, list: number[]){
    if(task.taskDescription == "") return false;
    if(task.shortDescription == "") return false;
    if(isNaN(task.pointsGained)) return false;
    if(task.workFinishDate == null) return false;
    if(task.signingFinishDate == null) return false;
    if(list.length == 0) return false;
  }

  submit(task_description: HTMLInputElement,
        short_description: HTMLInputElement,
        points_gained: HTMLInputElement,
        work_finish_date: HTMLInputElement,
        signing_finish_date: HTMLInputElement): boolean{
          let i: number;
          var list = [];
          for(i=0; i<this.form.value.tagsData.length; i++){
            if(this.form.value.tagsData[i] == true) {list.push(i+1);}
          }
          var date = new Date();

          this.task = {
            taskId: -1,
            uploaderId: parseInt(localStorage.getItem('userDBid'), 10),
            stateoftask: "TODO",
            taskDescription: task_description.value,
            shortDescription: short_description.value,
            pointsGained: parseInt(points_gained.value, 10),
            uploadDate: null,
            workFinishDate: work_finish_date.value.toString(),
            signingFinishDate: work_finish_date.value.toString(),
            noOfStudents: 3,
            workStartDate: null,
            tags: null
    };

        console.log(this.task);
        console.log(list);
        if(this.validate(this.task, list)==false){
          window.alert("All fields including tags must be filled");
          return false;
        };
    this.restService.addTask(this.task, list).subscribe();
    window.location.reload();
        return false;
  }
}
