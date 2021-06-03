import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../auth/login/login.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IJob } from '../shared/interfaces/job.interface';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';
// import { JobItemComponent } from 'src/app/job-item/job-item.component';



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
  @Output() deleted = new EventEmitter<number>();
  @Input()
  showDeleteBtn!: boolean;
  @Input() index = 0;

  constructor(private service: JobsService, private router: Router) {
    this.service.getAllJobsByCompany().subscribe((response)=>{
      this.jobs = response;
      // console.log(this.jobs);
    });
   }

   redirectJobReq(){
    this.router.navigate(['jobrequest']);
  }

  deleteItem() {
    this.deleted.emit(this.index);
  }


  ngOnInit(): void {

    //console.log(localStorage.user.rol);
  }

}
