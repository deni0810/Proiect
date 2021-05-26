import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../auth/login/login.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IJob } from '../shared/interfaces/job.interface';
import { JobsService } from '../jobs.service';


interface UserRecognised {
  email: string;
  rol: string;
}

@Component({
  selector: 'app-employerprofile',
  templateUrl: './employerprofile.component.html',
  styleUrls: ['./employerprofile.component.scss']
})
export class EmployerprofileComponent implements OnInit {
  jobs: IJob[] = [];

  constructor(private service: JobsService) {
    this.service.getAllJobsByCompany().subscribe((response)=>{
      this.jobs = response;
      console.log(this.jobs);
    });
   }

  ngOnInit(): void {

    //console.log(localStorage.user.rol);
  }

}
