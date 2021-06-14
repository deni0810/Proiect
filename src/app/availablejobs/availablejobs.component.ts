import { Component} from '@angular/core';
import { JobdetailsComponent } from 'src/app/jobdetails/jobdetails.component';
import { MatDialog } from '@angular/material/dialog';
import { JobsService } from 'src/app/jobs.service';

@Component({
  selector: 'app-availablejobs',
  templateUrl: './availablejobs.component.html',
  styleUrls: ['./availablejobs.component.scss'],
})
export class AvailablejobsComponent {
  jobs: any[] = [];
  rol!: string;


  constructor(
    public dialog: MatDialog,
    private service: JobsService
  ) {
    this.service.getAllJobs().subscribe((response) => {
      this.jobs = response;
      console.log(response);
    });

    const user = JSON.parse(localStorage.getItem('userData')!);
    this.rol = user.rol;
  }

  openJobDetails(index: number) {
    this.dialog.open(JobdetailsComponent, {
      width: '800px',
      panelClass: 'modal-no-padding',
      data: this.jobs[index],
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
