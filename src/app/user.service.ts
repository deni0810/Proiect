import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { IProfile } from './shared/interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getProfile(id: string) {
    return this.firestore
      .collection<IProfile>('profiles', (ref) => ref.where('id', '==', id))
      .valueChanges({ idField: 'docId' });
  }

  getCV(id: string) {
    return this.firestore
      .collection<IProfile>('CVS', (ref) => ref.where('createdBy', '==', id))
      .valueChanges({ idField: 'docId' });
  }

  saveAccount(user: IProfile) {
    this.firestore.collection('profiles').add(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // public async addAuthor(userId: string, jobDocId: string, userDocId: string) { //! not used?!
  //   const jobRef = this.firestore.collection('JobReq').doc(jobDocId);
  //   await jobRef.update({
  //     jobCreators: firebase.firestore.FieldValue.arrayUnion(userId),
  //   });

  //   const userRef = this.firestore.collection('profiles').doc(userDocId);
  //   await userRef.update({
  //     createdJobs: firebase.firestore.FieldValue.arrayUnion(jobDocId),
  //   });
  //   let userData = JSON.parse(localStorage.getItem('userData')!);
  //   try {
  //     userData.createdJobs.push(jobDocId);
  //   } catch {
  //     userData.createdJobs = [jobDocId];
  //   }
  //   localStorage.setItem('userData', JSON.stringify(userData));
  // }

}
