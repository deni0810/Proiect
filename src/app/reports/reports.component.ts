import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { JobsRankingService } from '../jobs-ranking.service';
//import { Observable } from 'rxjs';

interface Item {
  name: string;
}

interface CV {
  certification: any[];
  country: string;
  driver: any[];
  education: any[];
  email: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  private itemsCollection!: AngularFirestoreCollection<Item>;
  items: any[] = [];
  item: any;

  constructor(
    private firestore: AngularFirestore,
    private jobsRankingService: JobsRankingService
  ) {}

  ngOnInit() {
    this.itemsCollection = this.firestore.collection('CVS');
    this.firestore
      .collection('CVS')
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
