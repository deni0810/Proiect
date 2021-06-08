import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { JobsRankingService } from 'src/app/jobs-ranking.service';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase';
import { IJob } from './shared/interfaces/job.interface';
import { IItem } from './shared/interfaces/item.interface';





@Injectable({
  providedIn: 'root',
})
export class JobsService {
  [x: string]: any;
  private itemsCollection!: AngularFirestoreCollection<IItem>;
  items: any[] = [];
  item: any;


  constructor(
    private firestore: AngularFirestore,
    private jobsRankingService: JobsRankingService,
    public dialog: MatDialog
  ) {}


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
    return this.firestore.collection<IJob>('JobReq').doc(key).valueChanges({ idField: 'id' });
  }

  async deleteJob(key: string) {
    await this.firestore.collection('JobReq').doc(key).delete();
  }

  async deleteCandidate(jobDocId: string, jobCandidates: string[], userDocId: string, appliedJobs: string[]){
    const jobRef = this.firestore.collection('JobReq').doc(jobDocId);
    await jobRef.update({jobCandidates});
    const userRef = this.firestore.collection('profiles').doc(userDocId);
    await userRef.update({appliedJobs});
  }

  async updateJob(job: IJob){
    console.log(job);
    const jobRef = this.firestore.collection('JobReq').doc(job.id);
    await jobRef.update(job);
  }

}


