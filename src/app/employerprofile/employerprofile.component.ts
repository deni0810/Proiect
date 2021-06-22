import { Component } from '@angular/core';
import { IJob } from '../shared/interfaces/job.interface';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';
import { JobrequestComponent } from '../jobrequest/jobrequest.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user.service';
import { JobsRankingService } from '../jobs-ranking.service';
import { RankingComponent } from '../ranking/ranking.component';

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
            let candidate = { jobId: job.id, cv: profile[0] };
            candidate = this.jobsRankingService.sortCandidates(candidate, job);
            candidates.push(candidate);
          });
        }
      }
    });
  }

  redirectJobReq() {
    this.router.navigate(['jobrequest']);
  }

  deleteItem(index: any) {
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


  openRanking(index: any) {
    const job = this.jobs[index];
    this.dialog.open(RankingComponent, {
      width: '800px',
      panelClass: 'modal-no-padding',
      data: job,

    });
  }

  sortCandidatesArr(candidates: any[]) {
    let points = 0;
    const newCandidatesArr = [];
    for(let candidate of candidates) {
      if(candidate.points > points) {
        newCandidatesArr.push(candidate);
      }
    }
    return newCandidatesArr;
  }
}
