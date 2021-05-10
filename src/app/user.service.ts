import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProfile } from './shared/interfaces/profile.interface';
import { IUser } from './shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getProfile(id: any) {
    const userData =  this.firestore
      .collection<IUser>('profiles', (ref) => ref.where('id', '==', id))
      .valueChanges({ idField: 'docId' });
      //return userData;
      console.log(userData);
  }

  saveAccount(user: IProfile) {
    this.firestore.collection('profiles').add(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  
}
