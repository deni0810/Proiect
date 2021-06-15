import { Component } from '@angular/core';
import { IJob } from '../shared/interfaces/job.interface';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';
import { JobrequestComponent } from '../jobrequest/jobrequest.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user.service';
import { JobsRankingService } from '../jobs-ranking.service';

@Component({
  selector: 'app-employerprofile',
  templateUrl: './employerprofile.component.html',
  styleUrls: ['./employerprofile.component.scss'],
})
export class EmployerprofileComponent {
  [x: string]: any;
  jobs: IJob[] = [];

  constructor(
    private service: JobsService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private jobsRankingService: JobsRankingService
  ) {
    this.service.getAllJobsByCompany().subscribe((response) => {
      this.jobs = response;
      const candidates: any[] = [];
      for (let job of response) {
        for (let candidate of job.jobCandidates) {
          this.userService.getCV(candidate).subscribe((profile) => {
            const candidate = { jobId: job.id, cv: profile[0] };
            // candidates.push({ jobId: job.id, ...profile });
            // console.log(candidates);
            this.jobsRankingService.sortCandidates(candidate, job);
          });
        }
      }
    });
  }

  redirectJobReq() {
    this.router.navigate(['jobrequest']);
  }

  deleteItem(index: number) {
    this.service.deleteJob(this.jobs[index].id);
    this.jobs.splice(index, 1);
  }

  updateItem(index: number) {
    const job = this.jobs[index];
    this.dialog.open(JobrequestComponent, {
      width: '800px',
      height: '80vh',
      panelClass: 'modal-no-padding',
      data: job,
    });
  }
  logout() {
    this.authService.logout();
  }
}
