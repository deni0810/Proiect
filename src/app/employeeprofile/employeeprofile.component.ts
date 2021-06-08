import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import { IJob } from '../shared/interfaces/job.interface';


@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.scss']
})
export class EmployeeprofileComponent {

  items: any;
  jobs: IJob[] = [];
  @Output() deleted = new EventEmitter<number>();
  @Input()
  showDeleteBtn!: boolean;
  @Input() index = 0;

  constructor(public dialog: MatDialog,
    private router: Router, private jobsService: JobsService) {
      const appliedJobs = JSON.parse(localStorage.getItem('userData')!).appliedJobs;
      if(appliedJobs) {
        for(let job of appliedJobs) {
          this.getJob(job);
        }
      }
    }


  redirectCV(){
    this.router.navigate(['cvform']);
  }


  getJob(key: string) {
    this.jobsService.getJobByKey(key).subscribe((job) => {
      if(job) {
        this.jobs.push(job);
      }
    });
  }

  deleteItem(item: any) {
    let user = JSON.parse(localStorage.getItem('userData')!);
    const job = this.jobs[item]
    let candidateIndex =  job.jobCandidates.indexOf(user.id);
    if(candidateIndex >=0) {
      job.jobCandidates.splice(candidateIndex,1);
    }
    let jobIndex = user.appliedJobs.indexOf(job.id);
    if(jobIndex>=0) {
      user.appliedJobs.splice(jobIndex,1);
    }
    this.jobsService.deleteCandidate(job.id, job.jobCandidates,user.docId, user.appliedJobs);
  }

}
