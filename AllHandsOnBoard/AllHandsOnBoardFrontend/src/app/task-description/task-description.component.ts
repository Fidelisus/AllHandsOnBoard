import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { AuthService } from '../auth.service';
import { User } from '../data-models/user.model';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.css']
})
export class TaskDescriptionComponent implements OnInit {

  task;
  state: string;
  grades = [];
  list = [];
  studentIDs = [];
  blueContent: string;
  applicants: User[];
  id: number;
  canApply: boolean;

  constructor(private restService: RestService,
              private router: Router,
              private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('taskid'), 10);
    this.restService.getTask(this.id)
      .subscribe(data => {
        this.task = data;
        this.canApply = false;
        if (!this.isTeacher()) this.hasUserApplied();
      },
        error1 => console.error(error1),
        () => {
          this.applicants = [];
          for (const user of this.task.applied) {
            this.restService.getUser(parseInt(user.UserId, 10))
              .subscribe(data => this.applicants.push(data));
          }
          this.state = this.task.task.stateoftask;
          if (this.task.task.stateoftask === 'ACC') {
            this.task.task.stateoftask = 'In progress';
          }
        });

    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    if (localStorage.getItem('role') === 'student') {
      this.blueContent = 'Apply';
    } else {
      this.blueContent = 'Validate';
    }
  }

  back() {
    if (localStorage.getItem('previousPage') === 'profile') {
      this.router.navigateByUrl('profile');
    } else {
      this.router.navigateByUrl('task-list');
    }
  }

  home() {
    this.router.navigateByUrl('home');
  }

  isStudent() {
    if (localStorage.getItem('role') === 'student') {
      return true;
    } else {
      return false;
    }
  }

  isTeacher() {
    if (localStorage.getItem('role') === 'teacher') {
      return true;
    } else {
      return false;
    }
  }

  getLoggedUserId(): number {
    return +localStorage.getItem('userDBid');
  }

  stateOfTask() {
    if (this.state === 'TODO')
      return true;
    else
      return false;
  }

  apply() {
    this.restService.applyToTask(this.task.task.taskId)
      .subscribe(next => this.hasUserApplied());
  }

  check(state: boolean, studentId: number){
    if(state){
      const current = this.list.find(obj => obj === studentId);
      if(current != studentId){
        this.list.push(studentId);
      }
    }
    else{
      this.list.splice(this.list.indexOf(studentId), 1);
    }
  }

  isLast(index: number){
    if(this.applicants.length === (index + 1))
      return true;
  }

  select() {
    if(this.list.length == 0){
      window.alert("No students chosen");
      return false;
    }
    this.restService.selectStudents(this.task.task.taskId, this.list)
      .subscribe(next => {
        window.location.reload();
      });
  }

  getCurrentUserId(): number {
    return +localStorage.getItem('userDBid');
  }

  grading(grade: number, index: number){
    this.grades[index] = grade;
  }

  validate(){
    if(this.grades.length != this.applicants.length){
      window.alert("Firstly grade all the Students");
      return false;
    }
    for(let i=0; i<this.applicants.length; i++){
      this.studentIDs[i] = this.applicants[i].UserId;
    }
    this.restService.validateTask(this.id, this.studentIDs, this.grades).
      subscribe(next => {
        console.log(next),
        window.location.reload();
      }
      );
    
  }

  hasUserApplied() {
    if (this.task) {
      this.restService.getActiveTasks()
        .subscribe(data => {
          const array = data as Array<any>;
          for (const item of array) {
            if (item.taskId == +this.task.task.taskId) {
              this.canApply = true;
            }
          }
        }
      );
    }
    return this.canApply;
  }
}
