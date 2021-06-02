import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { JobsRankingService } from '../jobs-ranking.service';
import { UserService } from '../user.service';
import { JobdetailsComponent } from 'src/app/jobdetails/jobdetails.component';
import { MatDialog } from '@angular/material/dialog';
import { JobsService } from 'src/app/jobs.service';
import { stringify } from '@angular/compiler/src/util';

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
  [x: string]: any;
  private itemsCollection!: AngularFirestoreCollection<Item>;
  items: any[] = [];
  item: any;

  constructor(
    private firestore: AngularFirestore,
    private jobsRankingService: JobsRankingService,
    public dialog: MatDialog,
    private service: JobsService
  ) {
    this.service.getAllJobs().subscribe((response) => {
      this.items = response;
    });
  }

  openJobDetails(index: number) {
    this.dialog.open(JobdetailsComponent, {
      width: '800px',
      panelClass: 'modal-no-padding',
      data: this.items[index],
    });
  }

  Aplica(item: any) {
    let user = JSON.parse(localStorage.getItem('userData')!);
    if (!user.appliedJobs) {
      user.appliedJobs = [];
    }

    if (user.appliedJobs.indexOf(item.id) != -1) {
      alert('Ai aplicat deja la acest job!');
    } else {
      localStorage.setItem('userData', JSON.stringify(user));
      this.service.addApplication(user.id, item.id, user.docId);
      alert('Ai aplicat la acest job!');
    }
  }

  async ngOnInit() {
    // this.itemsCollection = this.firestore.collection('JobReq');
    // console.log(this.items);
    // this.firestore
    //   .collection('JobReq')
    //   .valueChanges()
    //   .subscribe((val) => {
    //     this.items = val;
    //     this.jobsRankingService.csv = val;
    //   });
    // this.itemsCollection
    //   .doc('${this.name}')
    //   .ref.get()
    //   .then((doc) => {
    //     this.item = doc.data();
    //   });
  }
}
