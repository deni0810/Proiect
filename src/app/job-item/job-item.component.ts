import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobdetailsComponent } from 'src/app/jobdetails/jobdetails.component';
import { MatDialog } from '@angular/material/dialog';
import { JobsService } from 'src/app/jobs.service';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

interface Item {
  name: string;
}

interface JOB {
  aboutcompany: string;
  aboutjob: string;
  schedule: string;
}

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent{
  [x: string]: any;
   job: IJob[] = [];
   private itemsCollection!: AngularFirestoreCollection<Item>;
  items: any[] = [];
  item: any;


  constructor(public dialog: MatDialog,
    private jobsService: JobsService,
    private router: Router) { }

    openJobDetails() {
      this.dialog.open(JobdetailsComponent, {
        width: '800px',
        panelClass: 'modal-no-padding',
        data: this.job,
      });
    }

    // view() {


    //    this.jobsService.appliedJobs  = localStorage.getItem('userData');

    // }

    apply() {
      try {
        const { appliedJobs, docId } = JSON.parse(
          localStorage.getItem('userData')!
        );
        if (this.checkAppliedJobs(appliedJobs)) {
          alert('Ai aplicat deja la acest job!');
        } else {
          const user = JSON.parse(localStorage.getItem('userData')!);
          // this.jobsService.addApplication(userId, docId, this.job);
          JSON.stringify(docId);
          this.service.addApplication(user.id, this.item.id, user.docId);
          alert('Ai aplicat la acest job!');
        }
      } catch {
        localStorage.setItem('pendingApplication', JSON.stringify(this.job));
        this.router.navigate(['cont', 'login']);
      }
    }

    // deleteItem() {
    //   this.deleted.emit(this.index);
    // }

    // checkAppliedJobs(appliedJobs: any) {
    //   for( let job of appliedJobs) {
    //     if(job.id === this.job.id) {
    //       return true;
    //     }
    //   }
    //   return false;
    // }

}
