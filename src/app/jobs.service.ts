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
import firebase from 'firebase';
import { IJob } from './shared/interfaces/job.interface';

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

  //! nu e ok
  // ngOnInit() {
  //   this.itemsCollection = this.firestore.collection('JobReq');

  //   console.log(this.items);

  //   this.firestore
  //     .collection('JobReq')
  //     .valueChanges()
  //     .subscribe((val) => {
  //       this.items = val;
  //       this.jobsRankingService.csv = val;
  //     });
  //   this.itemsCollection
  //     .doc('${this.name}')
  //     .ref.get()
  //     .then((doc) => {
  //       this.item = doc.data();
  //     });
  // }

  getAllJobs() {
    const ref = this.firestore.collection('JobReq');
    return ref.valueChanges({ idField: 'id' });
  }

  public getAllJobsByCompany() {
    const id = JSON.parse(localStorage.getItem('userData')!).id;
    return this.firestore.collection<IJob>('JobReq', (ref) => ref.where('createdBy', '==', id))
      .valueChanges({ idField: 'id' });
  }

  public async addApplication(userId: string, jobDocId: string, userDocId: string) {
    const jobRef = this.firestore.collection('JobReq').doc(jobDocId);
    await jobRef.update({
      jobCandidates: firebase.firestore.FieldValue.arrayUnion(userId),
    });

    const userRef = this.firestore.collection('profiles').doc(userDocId);
    await userRef.update({
      appliedJobs: firebase.firestore.FieldValue.arrayUnion(jobDocId),
    });
    let userData = JSON.parse(localStorage.getItem('userData')!);
    try {
      userData.appliedJobs.push(jobDocId);
    } catch {
      userData.appliedJobs = [jobDocId];
    }
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  public getJobByKey(key: string) {
    return this.firestore.collection<IJob>('JobReq').doc(key).valueChanges();
  }

  async deleteJob(key: string) {
    await this.firestore.collection('JobReq').doc(key).delete();
  }
}


