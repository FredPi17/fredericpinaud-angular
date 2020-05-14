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
    /*const req = this.http.post<Signin>('http://localhost:3000/admin/signin', {username: user, password: pass})
      .subscribe(
        res => { // Success
          if (res.accessToken) {
            sessionStorage.setItem('x-auth-token', res.accessToken);
            sessionStorage.setItem('username', res.username);
            sessionStorage.setItem('email', res.email);
            sessionStorage.setItem('id', res.id);
            this.router.navigate(['/admin']);
          }
        },
        msg => { // Error
          alert(msg.error.message);
          window.location.reload();
        }
      );*/
  }

  signupUser(user: string, pass: string, mail: string) {
    const req = this.http.post<Signup>('http://localhost:3000/admin/signup', {username: user, password: pass, email: mail})
      .subscribe(
        res => {
          if (res.id) {
            alert('Your account is created, wait for the administrator acceptation');
            this.router.navigate(['/auth', 'signin']);
          }
        },
        msg => {
          alert(msg.error.message);
          window.location.reload();
        }
      );
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
