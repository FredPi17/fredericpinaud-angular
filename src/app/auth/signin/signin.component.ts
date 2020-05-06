import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles:
    ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  loading: boolean;
  error = '';

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
    this.authService.signinUser(username, password);
  }

}
