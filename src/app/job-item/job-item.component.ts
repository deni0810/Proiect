import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobdetailsComponent } from 'src/app/jobdetails/jobdetails.component';
import { MatDialog } from '@angular/material/dialog';
import { JobsService } from 'src/app/jobs.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent {
  [x: string]: any;
  @Input() job!: IJob;
  @Input() jobIndex!: number;
  @Input() showDeleteBtn = false;
  @Output() deleted = new EventEmitter<number>();
  @Input() showUpdateBtn = false;
  @Output() update = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {}

  openJobDetails() {
    this.dialog.open(JobdetailsComponent, {
      width: '800px',
      panelClass: 'modal-no-padding',
      data: this.job,
    });
  }

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

  deleteItem() {
    this.deleted.emit(this.jobIndex);
  }

  updateItem() {
    this.update.emit(this.jobIndex);
  }

}
