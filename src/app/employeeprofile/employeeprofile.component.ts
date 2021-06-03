import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CvformComponent } from '../cvform/cvform.component';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import { IJob } from '../shared/interfaces/job.interface';


@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.scss']
})
export class EmployeeprofileComponent implements OnInit {

  items: any;
  jobs: IJob[] = [];
  @Output() deleted = new EventEmitter<number>();
  @Input()
  showDeleteBtn!: boolean;
  @Input() index = 0;

  constructor(public dialog: MatDialog,
    private router: Router, private jobsService: JobsService) {
      const appliedJobs = JSON.parse(localStorage.getItem('userData')!).appliedJobs;
      for(let job of appliedJobs) {
        this.getJob(job);
      }
    }


  redirectCV(){
    this.router.navigate(['cvform']);
  }

  //!Sterge asta
  ngOnInit(): void {
  }
  //!
  getJob(key: string) {
    this.jobsService.getJobByKey(key).subscribe((job) => {
      if(job) {
        this.jobs.push(job);
      }
    });
  }

  deleteItem() {
    this.deleted.emit(this.index);
  }

}
