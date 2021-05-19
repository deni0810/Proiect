import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { JobsRankingService } from '../jobs-ranking.service';
import { JobdetailsComponent } from 'src/app/jobdetails/jobdetails.component';
import { MatDialog } from '@angular/material/dialog';

interface Item {
  name: string;
}

interface JOB {
  aboutcompany: string;
  aboutjob: string;
  schedule: string;
}

@Component({
  selector: 'app-availablejobs',
  templateUrl: './availablejobs.component.html',
  styleUrls: ['./availablejobs.component.scss'],
})
export class AvailablejobsComponent implements OnInit {
  private itemsCollection!: AngularFirestoreCollection<Item>;
  items: any[] = [];
  item: any;

  constructor(
    private firestore: AngularFirestore,
    private jobsRankingService: JobsRankingService,
    public dialog: MatDialog,
  ) {}


  openJobDetails(index: number) {
    this.dialog.open(JobdetailsComponent, {
      width: '800px',
      panelClass: 'modal-no-padding',
      data: this.items[index],
    });
  }

  ngOnInit() {
    this.itemsCollection = this.firestore.collection('JobReq');

    console.log(this.items);

    this.firestore
      .collection('JobReq')
      .valueChanges()
      .subscribe((val) => {
        this.items = val;
        this.jobsRankingService.csv = val;
      });
    this.itemsCollection
      .doc('${this.name}')
      .ref.get()
      .then((doc) => {
        this.item = doc.data();
      });



  }


}


