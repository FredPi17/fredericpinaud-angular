import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {HttpResponse} from '@angular/common/http';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userInfoForm: FormGroup;
  passwordForm: FormGroup;
  user?: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.getUserInfos();
    this.userInfoForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      }
    );

    this.passwordForm = this.formBuilder.group(
      {
        password: ['', [Validators.min(8)]]
      }
    );
  }

  onSubmitInfos() {
    let usernameForm = this.userInfoForm.get('username').value;
    let emailForm = this.userInfoForm.get('email').value;

    if (usernameForm === '') {
      usernameForm = sessionStorage.getItem('username');
    }
    if (emailForm === '') {
      emailForm = sessionStorage.getItem('email');
    }
    this.userService.updateUserInfos(usernameForm, emailForm, sessionStorage.getItem('id'))
      .subscribe((res: HttpResponse<string>) => (this.getUserInfos()));
  }

  onSubmitPassword() {
    const password = this.passwordForm.get('password').value;
    this.userService.updatePassword(password, this.user.id).subscribe((res: HttpResponse<string>) => (this.getUserInfos()));
  }

  getUserInfos() {
    this.userService.getUserInfos(sessionStorage.getItem('id')).subscribe((res: HttpResponse<User>) => (this.user = res.body));
  }

}
