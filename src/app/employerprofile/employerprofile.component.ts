import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJob } from '../shared/interfaces/job.interface';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';
import { JobrequestComponent } from '../jobrequest/jobrequest.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employerprofile',
  templateUrl: './employerprofile.component.html',
  styleUrls: ['./employerprofile.component.scss']
})
export class EmployerprofileComponent  {
  [x: string]: any;
  jobs: IJob[] = [];

  constructor(private service: JobsService, private router: Router, public dialog: MatDialog) {
    this.service.getAllJobsByCompany().subscribe((response)=>{
      this.jobs = response;
    });
   }

   redirectJobReq(){
    this.router.navigate(['jobrequest']);
  }

  deleteItem(index: number) {
    this.service.deleteJob(this.jobs[index].id);
    this.jobs.splice(index, 1);
  }

  updateItem(index: number){
    const job = this.jobs[index];
    this.dialog.open(JobrequestComponent, {
      width: '800px',
      height: '80vh',
      panelClass: 'modal-no-padding',
      data: job,
    });
}

}
