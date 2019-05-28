import { Component, OnInit } from '@angular/core';
import { Task } from '../data-models/task.model';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-task-adder',
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.css']
})
export class TaskAdderComponent implements OnInit {
  task: Task;
  tags: any;
  checkedList: any;


  constructor(private restService:RestService,
              private router: Router,
              private auth: AuthService){
                this.tags = [
                  {id: 1, value: 'Math', isSelected: false},
                  {id: 2, value: 'Phys', isSelected: false},
                  {id: 3, value: 'Chem', isSelected: false}
                ];
                this.getCheckedItemList();
              }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
      }
    }

  getCheckedItemList(){
    this.checkedList=[];
    for(var i=0; i<this.tags.length; i++){
      if(this.tags[i].isSelected)
      this.checkedList.push(this.tags[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  back(){
    this.router.navigateByUrl('home');
  }
  submit(task_description: HTMLInputElement,
        short_description: HTMLInputElement,
        points_gained: HTMLInputElement,
        work_finish_date: HTMLInputElement): boolean{
          var date = new Date();
          this.task = {
            taskId: 3,
            uploaderId: 4,
            uploaderName: 'jan',
            uploaderSurname: 'schi',
            uploaderEmail: '@gmail',
            tags: [],
            taskDescription: task_description.value,
            taskShortDescription: short_description.value,
            pointsGained: parseInt(points_gained.value, 10),
            uploadDate: ""+date.getTime(),
            finishDate: work_finish_date.value
          };

      //  console.log(this.task);
        this.restService.addTask(this.task);
        return false;
  }


}
