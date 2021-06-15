import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJob } from 'src/app/shared/interfaces/job.interface';
import { JobdetailsComponent } from 'src/app/jobdetails/jobdetails.component';
import { MatDialog } from '@angular/material/dialog';
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
  //!
  @Output() deleted = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();
  @Output() jobApply = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog,
  ) {}

  openJobDetails() {
    this.dialog.open(JobdetailsComponent, {
      width: '800px',
      panelClass: 'modal-no-padding',
      data: this.job,
    });
  }

  apply() {
    this.jobApply.emit(this.jobIndex);
  }

  deleteItem() {
    this.deleted.emit(this.jobIndex);
  }

  updateItem() {
    this.update.emit(this.jobIndex);
  }

}
