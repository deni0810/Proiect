import { Component, OnInit } from '@angular/core';
import { JobsRankingService } from '../jobs-ranking.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private jobsRankingService: JobsRankingService) { }

  ngOnInit(): void {
    this.jobsRankingService.compare();
  }

}
