import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles:
    ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {

  }


}
