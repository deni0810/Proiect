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
  cvArr: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private jobsRankingService: JobsRankingService,
    private service: JobsService,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    const candidates: any[] = [];

    for (let candidate of data.jobCandidates) {
      this.userService.getCV(candidate).subscribe((profile: any[]) => {
        let candidate = { jobId: data.id, cv: profile[0] }; // cred ca jobId poate sa dispara
        candidate = this.jobsRankingService.sortCandidates(candidate, data);
        candidates.push(candidate);
        if (candidates.length === data.jobCandidates.length) {
          this.cvArr = this.sortCandidatesArr(candidates);
        }
      });
    }
  }

  sortCandidatesArr(candidates: any[]) {
    const newCandidatesArr = [];
    candidates.sort(function (a, b) {
      // console.log(a, b);
      // console.log(a.points - b.points);
      return a.points - b.points;
    });

    return candidates.reverse();
  }
}
