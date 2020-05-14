import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { Signin } from 'src/app/models/signin';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles:
    ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  loading: boolean = false;
  error = '';
  wrongCredentialMessage = '';
  wrongCredential = false;
  loaded = false;
  signedInMessage = '';


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const username = this.signInForm.get('username').value;
    const password = this.signInForm.get('password').value;
    this.authService.signinUser(username, password).subscribe(
      (res: HttpResponse<string> ) => (this.signinResult(res.body))
    );
  }

  signinResult(result) {
    this.loading = false;
    if (result.status === 'error') {
      this.loaded = false;
      this.wrongCredential = true;
      this.wrongCredentialMessage = result.message;
      this.signedInMessage = '';
    
    }
    else if (result.status === 'success') {
      this.loaded = true;
      this.wrongCredential = false;
      this.wrongCredentialMessage = '';
      this.signedInMessage = result.message;
      setTimeout(()=> {this.signinInUser(result)}, 2000);
    }
  }

  signinInUser(result) {
    sessionStorage.setItem('x-auth-token', result.accessToken);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('id', result.id);
    this.router.navigate(['/admin']);
  }


}
