import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styles:
        ['@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"; '],
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signUpForm: FormGroup;
    loading: boolean = false;
    error: boolean = false;
    errorMessage: string = '';
    created: boolean = false;
    successMessage: string = '';

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
        this.loading = true;
        const username = this.signUpForm.get('username').value;
        const password = this.signUpForm.get('password').value;
        const email = this.signUpForm.get('email').value;
        this.authService.signupUser(username, password, email).subscribe((res: HttpResponse<string>) => (this.signUp(res.body)));
    }

    signUp(result) {
        this.loading = false;
        if (result.status === 'success') {
            this.error = false;
            this.created = true;
            this.successMessage = result.message;
            setTimeout(()=> {this.signupUser()}, 2000);
        }
        else if (result.status === "error") {
            this.created = false;
            this.error = true;
            this.errorMessage = result.message;
        }
    }

    signupUser() {
        this.router.navigate(['/auth', 'signin']);
    }
}
