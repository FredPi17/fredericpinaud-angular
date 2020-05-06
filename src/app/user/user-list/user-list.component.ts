import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  user?: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getListUsers().subscribe((res: HttpResponse<User[]>) => (this.user = res.body));
  }

  activateUser(id) {
    this.userService.activateUser(id).subscribe((res: HttpResponse<string>) => (this.getUserList()));
  }

  deactivateUser(id) {
    this.userService.deactivateUser(id).subscribe((res: HttpResponse<string>) => (this.getUserList()));
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe((res: HttpResponse<{}>) => (this.getUserList()));
  }
}
