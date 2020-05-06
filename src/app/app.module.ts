import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {AuthComponent} from './auth/auth.component';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {CvComponent} from './cv/cv.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SignupComponent} from './auth/signup/signup.component';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './navbar/navbar.component';
import {UserInfoComponent} from './user/user-info/user-info.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserComponent} from './user/user.component';
import {SkillComponent} from './cv-tiles/skill/skill.component';
import {EducationComponent} from './cv-tiles/education/education.component';
import {SoftSkillComponent} from './cv-tiles/soft-skill/soft-skill.component';
import {CvTilesComponent} from './cv-tiles/cv-tiles.component';
import {UnitEducationComponent} from './cv-tiles/education/unit-education/unit-education.component';
import {UnitSoftComponent} from './cv-tiles/soft-skill/unit-soft/unit-soft.component';
import {UnitSkillComponent} from './cv-tiles/skill/unit-skill/unit-skill.component';
import {UnitSoftTypeComponent} from './cv-tiles/soft-skill/unit-soft-type/unit-soft-type.component';

const appRoutes: Routes = [
  {path: 'admin', canActivate: [AuthGuardService], component: AdminComponent},
  {path: 'admin/user', canActivate: [AuthGuardService], component: UserComponent},
  {path: 'admin/cv', canActivate: [AuthGuardService], component: CvTilesComponent},
  {path: 'admin/cv/education/:id', canActivate: [AuthGuardService], component: UnitEducationComponent},
  {path: 'admin/cv/soft/:id', canActivate: [AuthGuardService], component: UnitSoftComponent},
  {path: 'admin/cv/soft/type/:id', canActivate: [AuthGuardService], component: UnitSoftTypeComponent},
  {path: 'admin/cv/skill/:id', canActivate: [AuthGuardService], component: UnitSkillComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: '', component: CvComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    SigninComponent,
    CvComponent,
    SignupComponent,
    NavbarComponent,
    UserInfoComponent,
    UserListComponent,
    UserComponent,
    SkillComponent,
    EducationComponent,
    SoftSkillComponent,
    CvTilesComponent,
    UnitEducationComponent,
    UnitSoftComponent,
    UnitSkillComponent,
    UnitSoftTypeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // or 'top'
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64] // [x, y] - adjust scroll offset
    }),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
