import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public username: string;
  href: string;
  signOutForm: FormGroup;
  signedIn: boolean;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.signedIn = this.authService.getConnectionStatus();
    this.href = this.router.url;
    this.signOutForm = this.formBuilder.group(
      this.signOutForm = this.formBuilder.group(
        {
          signout: []
        }
      )
    );
  }

  onSubmit() {
    this.authService.signOut();

  }

}
