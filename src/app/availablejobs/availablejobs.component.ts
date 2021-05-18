import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { JobsRankingService } from '../jobs-ranking.service';

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
    private jobsRankingService: JobsRankingService
  ) {}

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
