import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobsService } from 'src/app/jobs.service';
import { JobdetailsComponent } from '../jobdetails/jobdetails.component';

@Component({
  selector: 'app-availablejobs',
  templateUrl: './availablejobs.component.html',
  styleUrls: ['./availablejobs.component.scss'],
})
export class AvailablejobsComponent {
  jobs: any[] = [];
  rol!: string;
  showApplyBtn = true;

  constructor(public dialog: MatDialog, private service: JobsService) {
    this.service.getAllJobs().subscribe((response) => {
      this.jobs = response;
    });

    const user = JSON.parse(localStorage.getItem('userData')!);
    this.rol = user.rol;
    if(user.rol === "angajator"){
      this.showApplyBtn = false;
    }
  }

  openJobDetails() {
    this.dialog.open(JobdetailsComponent, {
      width: '800px',
      panelClass: 'modal-no-padding',
      data: this.jobs,
    });
  }

  apply(index: any) {
    const job = this.jobs[index];
    let user = JSON.parse(localStorage.getItem('userData')!);
    if (!user.appliedJobs) {
      user.appliedJobs = [];
    }

    if (user.appliedJobs.indexOf(job.id) != -1) {
      alert('Ai aplicat deja la acest job!');
    } else {
      localStorage.setItem('userData', JSON.stringify(user));
      this.service.addApplication(user.id, job.id, user.docId);
      alert('Ai aplicat la acest job!');
    }
  }
}
