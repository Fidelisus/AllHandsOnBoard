import { Component, OnInit} from '@angular/core';
import { Task } from '../data-models/task.model';
import { Tags } from '../task-adder/tags.interface';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.css']
})
export class TaskDescriptionComponent implements OnInit {

  task: Task;

  constructor(private restService:RestService,
              private router: Router,
              private auth: AuthService,
              private route: ActivatedRoute){}

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('taskid'), 10);
    console.log(id);

    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('login');
      }
  }

  back(){
    this.router.navigateByUrl('task-list');
  }

}
