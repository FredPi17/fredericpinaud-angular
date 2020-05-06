import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styles:
        ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.signUpForm = this.formBuilder.group(
            {
                username: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/), Validators.minLength(5)]],
                email: ['', [Validators.email]],
                password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/), Validators.minLength(8)]]
            }
        );
    }

    onSubmit() {
        const username = this.signUpForm.get('username').value;
        const password = this.signUpForm.get('password').value;
        const email = this.signUpForm.get('email').value;
        this.authService.signupUser(username, password, email);
    }

}
