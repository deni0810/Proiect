import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { JobrequestComponent } from './jobrequest/jobrequest.component';
import { AvailablejobsComponent } from './availablejobs/availablejobs.component';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { JobsRankingService } from 'src/app/jobs-ranking.service';
import { UserService } from 'src/app/user.service';
import { JobdetailsComponent } from 'src/app/jobdetails/jobdetails.component';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase';

interface Item {
  name: string;
}

interface JOB {
  aboutcompany: string;
  aboutjob: string;
  schedule: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  [x: string]: any;
  private itemsCollection!: AngularFirestoreCollection<Item>;
  items: any[] = [];
  item: any;
  // jobsCollection: any;
  // jobs: any;
  // itemDoc!: AngularFirestoreDocument;
  // public jobs$!: Observable<IJob[]>;
  // public jobForm: FormGroup = null;
  // public uid: any;

  constructor(
    private firestore: AngularFirestore,
    private jobsRankingService: JobsRankingService,
    public dialog: MatDialog
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

  public async addApplication(userId: any, job: { id: any; }, userDocId: any) {
    const jobId = job.id;
    const jobRef = this.db.collection('jobs').doc(jobId);
    const jobUnionRes = await jobRef.update({
      jobCandidates: firebase.firestore.FieldValue.arrayUnion(userId),
    });

}

}
