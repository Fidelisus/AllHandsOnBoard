import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { User } from '../user.model';
import { RestService } from '../rest.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()
  user: User;

  constructor(private restService:RestService){
    //restService.getUser().subscribe(User => {this.user = User});
    this.user = restService.getUser();
  }

  ngOnInit() {
  }

}
