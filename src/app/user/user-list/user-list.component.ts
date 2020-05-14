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
  deactivateMessage: string = '';
  activateUserOk: boolean = false;
  activateUserNok: boolean = false;
  activateUserMessage: string = '';
  deactivateStatusOk: boolean = false;
  deactivateStatusNok: boolean = false;
  deleteMessage: string = '';
  deleteStatusOk: boolean = false;
  deleteStatusNok: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getListUsers().subscribe((res: HttpResponse<User[]>) => (this.user = res.body));
  }

  activateUser(id) {
    this.userService.activateUser(id).subscribe((res: HttpResponse<string>) => (this.verifyActivationOk(res.body)));
  }

  deactivateUser(id: number) {
    if (id.toString() !== sessionStorage.getItem('id')) {
      this.userService.deactivateUser(id).subscribe((res: HttpResponse<string>) => (this.verifyDeactivationOk(res.body)));
    }
    else {
      this.deactivateStatusOk = false;
      this.deactivateStatusNok = true;
      this.deactivateMessage = 'Tu ne peux pas te désactiver toi-même !';
      setTimeout(()=> {this.deactivateStatusNok = false}, 2000);
    }
  }

  verifyDeactivationOk(result) {
    if (result.data.id !== '') {
      this.userService.getUserInfos(result.data.id).subscribe((res: HttpResponse<User>) => {
        if (!res.body.active) {
          this.deactivateStatusNok = false;
          this.deactivateStatusOk = true;
          this.deactivateMessage = 'Utilisateur désactivé avec succès !';
          setTimeout(()=> {this.deactivateStatusOk = false}, 2000);
          this.getUserList();
        }
        else if(res.body.status == 'error') {
          this.deactivateStatusOk = false;
          this.deactivateStatusNok = true;
          this.deactivateMessage = res.body.message;
          setTimeout(()=> {this.deactivateStatusNok = false}, 2000);
        }
      })
    }
    else  {
      this.deactivateStatusOk = false;
      this.deactivateStatusNok = true;
      this.deactivateMessage = 'There was an error while processing..';
      setTimeout(()=> {this.deactivateStatusNok = false}, 2000);
    }
  }

  verifyActivationOk(result) {
    if (result.data.id !== '') {
      this.userService.getUserInfos(result.data.id).subscribe((res: HttpResponse<User>) =>
      {
        if (res.body.active) {
          this.activateUserNok = false;
          this.activateUserOk = true;
          this.activateUserMessage = 'Utilisateur activé avec succès !';
          setTimeout(() => {this.activateUserOk = false}, 2000);
          this.getUserList();
        }
        else if (res.body.status == 'error') {
          this.activateUserOk = false;
          this.activateUserNok = true;
          this.activateUserMessage = 'There was an error while processing..'
          setTimeout(() => {this.activateUserNok = false}, 2000);
        }
      } )
    }
    else {
      this.activateUserOk = false;
      this.activateUserNok = true;
      this.activateUserMessage = 'There was an error while processing..'
      setTimeout(() => {this.activateUserNok = false}, 2000);
    }
  }

  deleteUser(id) {
    console.log('user id: ', id, " session id: ", sessionStorage.getItem('id'));
    if (id.toString() !== sessionStorage.getItem('id')) {
      this.userService.deleteUser(id).subscribe((res: HttpResponse<{}>) => (this.getUserList()));
      this.deleteStatusNok = false;
      this.deleteStatusOk = true;
      this.deleteMessage = 'Utilisateur supprimé !';
      setTimeout(()=> {this.deleteStatusOk = false}, 2000)
    }
    else {
      this.deleteStatusOk = false;
      this.deleteStatusNok = true;
      this.deleteMessage = 'Tu ne peux pas te supprimer toi-même !';
      setTimeout(()=> {this.deleteStatusNok = false}, 2000)
    }
  }
}
