import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getProfile(id: any) {
    return this.firestore.collection<IUser>('profiles',(ref)=>ref.where('id', '==', id))
    .valueChanges({idField:'docId'})
  }

  saveAccount(user: any){
    this.firestore.collection('profiles').add(user);
  }

}
