import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Signin} from '../models/signin';
import {SigninComponent} from '../auth/signin/signin.component';
import {Signup} from '../models/signup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router, protected http: HttpClient) {
  }

  signinUser(user: string, pass: string): Observable<HttpResponse<string>> {
    return this.http.post<string>('http://localhost:3000/admin/signin', {username: user, password: pass}, {observe: 'response'});
  }

  signupUser(user: string, pass: string, mail: string): Observable<HttpResponse<string>> {
    return this.http.post<string>('http://localhost:3000/admin/signup', {username: user, password: pass, email: mail}, {observe: 'response'});
  }

  signOut() {
    sessionStorage.setItem('x-auth-token', '');
    sessionStorage.setItem('username', '');
    sessionStorage.setItem('email', '');
    this.router.navigate(['/auth', 'signin']);
  }

  getConnectionStatus() {
    return sessionStorage.getItem('x-auth-token') !== '';
  }

}
