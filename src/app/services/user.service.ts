import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

type UserListResponse = HttpResponse<User[]>;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, protected http: HttpClient) {
  }

  getListUsers(): Observable<UserListResponse> {
    return this.http.get<User[]>('http://localhost:3000/admin/user', {observe: 'response'});
  }

  activateUser(id): Observable<HttpResponse<string>> {
    const host = 'http://localhost:3000/admin/user/activate/' + id;
    console.log('activate user: ' + host);
    return this.http.post<string>(host, '', {observe: 'response'});
  }

  deactivateUser(id): Observable<HttpResponse<string>> {
    const host = 'http://localhost:3000/admin/user/deactivate/' + id;
    console.log('deactivate user: ' + host);
    return this.http.post<string>(host, '', {observe: 'response'});
  }

  deleteUser(id): Observable<HttpResponse<{}>> {
    const host = 'http://localhost:3000/admin/user/' + id;
    console.log('delete user: ' + host);
    return this.http.delete(host, {observe: 'response'});
  }

  updateUserInfos(name, mail, id): Observable<HttpResponse<{}>> {
    const host = 'http://localhost:3000/admin/user/update/' + id;
    console.log('update user infos: ' + host);
    return this.http.post(host, {username: name, email: mail}, {observe: 'response'});
  }

  updatePassword(pass, id): Observable<HttpResponse<string>> {
    const host = 'http://localhost:3000/admin/user/updatePassword/' + id;
    console.log('update password: ' + host);
    return this.http.put<string>(host, {password: pass}, {observe: 'response'});
  }

  getUserInfos(id): Observable<HttpResponse<User>> {
    const host = 'http://localhost:3000/admin/user/' + id;
    console.log('get user infos: ' + host);
    return this.http.get<User>(host, {observe: 'response'});
  }
}

