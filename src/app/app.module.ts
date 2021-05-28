import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CvformComponent } from './cvform/cvform.component';
import { HomeComponent } from './home/home.component';
import { JobrequestComponent } from './jobrequest/jobrequest.component';
import { ReportsComponent } from './reports/reports.component';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking/ranking.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { EmployerprofileComponent } from './employerprofile/employerprofile.component';
import { EmployeeprofileComponent } from './employeeprofile/employeeprofile.component';
import { AvailablejobsComponent } from './availablejobs/availablejobs.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { ProfileComponent } from './profile/profile.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cvform', component: CvformComponent, canActivate: [AuthGuard] },
  {
    path: 'jobrequest',
    component: JobrequestComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'employee', component: EmployeeprofileComponent},
  { path: 'employer', component: EmployerprofileComponent},
  { path: 'availablejobs', component: AvailablejobsComponent},
  { path: 'jobdetails', component: JobdetailsComponent},
  { path: 'profile', component: ProfileComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CvformComponent,
    HomeComponent,
    JobrequestComponent,
    ReportsComponent,
    RankingComponent,
    LoginComponent,
    RegisterComponent,
    EmployerprofileComponent,
    EmployeeprofileComponent,
    AvailablejobsComponent,
    JobdetailsComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
