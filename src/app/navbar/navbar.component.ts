import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public username: string;
  href: string;
  url: boolean;
  signOutForm: FormGroup;
  signedIn: boolean;
  visible: boolean;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
                router.events.subscribe(val => {
                  if (location.path() != "") {
                    this.url = true
                  }
                  else {
                    this.url = false;
                  }
                })
              }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.signedIn = this.authService.getConnectionStatus();
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
