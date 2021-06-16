import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobsService } from '../jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { JobsRankingService } from '../jobs-ranking.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  job;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private jobsRankingService: JobsRankingService,
    private service: JobsService,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.job = data;
    console.log(this.job);

    const candidates: any[] = [];

    for (let candidate of this.job.jobCandidates) {
      this.userService.getCV(candidate).subscribe((profile: any[]) => {
        let candidate = { jobId: this.job.id, cv: profile[0] };
        candidate = this.jobsRankingService.sortCandidates(candidate, this.job);
        candidates.push(candidate);
        console.log(candidate);
      });
    }
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
