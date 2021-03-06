import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss']
})
export class JobdetailsComponent implements OnInit {
  job;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.job = data;
  }
  ngOnInit(): void {
  }

}
