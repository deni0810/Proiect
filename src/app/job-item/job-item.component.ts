import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobdetailsComponent } from 'src/app/jobdetails/jobdetails.component';
import { MatDialog } from '@angular/material/dialog';
import { RankingComponent } from '../ranking/ranking.component';
@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent {
  //TODO pune variabilele intr-un obiect
  @Input() job!: IJob;
  @Input() jobIndex!: number;
  @Input() showDeleteBtn = false;
  @Input() showApplyBtn = false;
  @Input() showUpdateBtn = false;
  @Input() showJobDetailsBtn = false;
  @Input() showRankingBtn = false;
  //!
  @Output() deletedJob = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();
  @Output() jobApply = new EventEmitter<number>();
  @Output() jobdetails = new EventEmitter<number>();
  @Output() jobranking = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog,
  ) {}



  apply() {
    this.jobApply.emit(this.jobIndex);
  }

  deleteItem() {
    this.deletedJob.emit(this.jobIndex);
  }

  updateItem() {
    this.update.emit(this.jobIndex);
  }

  openJobDetails() {
    this.jobdetails.emit(this.jobIndex);
  }

  openRanking() {
    this.jobranking.emit(this.jobIndex);
  }


}
