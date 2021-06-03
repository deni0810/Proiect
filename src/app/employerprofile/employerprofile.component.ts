import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJob } from '../shared/interfaces/job.interface';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employerprofile',
  templateUrl: './employerprofile.component.html',
  styleUrls: ['./employerprofile.component.scss']
})
export class EmployerprofileComponent  {
  jobs: IJob[] = [];

  constructor(private service: JobsService, private router: Router) {
    this.service.getAllJobsByCompany().subscribe((response)=>{
      this.jobs = response;
    });
   }

   redirectJobReq(){
    this.router.navigate(['jobrequest']);
  }

  deleteItem(index: any) {
    this.service.deleteJob(this.jobs[index].id);
    this.jobs.splice(index, 1);
  }
}
