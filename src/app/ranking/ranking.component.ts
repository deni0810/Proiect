import { Component, OnInit } from '@angular/core';
import { JobsRankingService } from '../jobs-ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  constructor(private service: JobsRankingService) { 
    this.service.cv$.subscribe((cv)=>{
      console.log(cv);
    });
  }

  ngOnInit(): void {
  }

}
