import { Component, OnInit } from '@angular/core';
import { JobsRankingService } from '../jobs-ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  constructor(private jobsRankingService: JobsRankingService) {}

  ngOnInit(): void {
    this.jobsRankingService.compare();
    this.jobsRankingService.cv$.subscribe((cvArray) => {
      console.log(cvArray); // aici ai lista
    });
  }
}
