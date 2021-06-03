import { Component, Input} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { JobsRankingService } from '../jobs-ranking.service';
// import { UserService } from '../user.service';
import { JobdetailsComponent } from 'src/app/jobdetails/jobdetails.component';
import { MatDialog } from '@angular/material/dialog';
import { JobsService } from 'src/app/jobs.service';
// import { stringify } from '@angular/compiler/src/util';
// import { IJob } from '../shared/interfaces/job.interface';
import { IProfile } from '../shared/interfaces/profile.interface'; //! atentie la importuri, nu le folosesti!


interface Item {
  name: string;
}
 //! sterge, doar o interfata!
// interface JOB {
//   aboutcompany: string;
//   aboutjob: string;
//   schedule: string;
// }

@Component({
  selector: 'app-availablejobs',
  templateUrl: './availablejobs.component.html',
  styleUrls: ['./availablejobs.component.scss'],
})
export class AvailablejobsComponent {
  [x: string]: any;
  private itemsCollection!: AngularFirestoreCollection<Item>; // nu folosesti
  items: any[] = [];
  item: any;
  rol!: string;


  constructor(
    private firestore: AngularFirestore, //nu folosesti
    private jobsRankingService: JobsRankingService, //nu folosesti
    public dialog: MatDialog,
    private service: JobsService
  ) {
    this.service.getAllJobs().subscribe((response) => {
      this.items = response;
    });

    const user = JSON.parse(localStorage.getItem('userData')!);
    this.rol = user.rol;
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


  // async ngOnInit() { // nu mai folosesti
  //   // this.itemsCollection = this.firestore.collection('JobReq');
  //   // console.log(this.items);
  //   // this.firestore
  //   //   .collection('JobReq')
  //   //   .valueChanges()
  //   //   .subscribe((val) => {
  //   //     this.items = val;
  //   //     this.jobsRankingService.csv = val;
  //   //   });
  //   // this.itemsCollection
  //   //   .doc('${this.name}')
  //   //   .ref.get()
  //   //   .then((doc) => {
  //   //     this.item = doc.data();
  //   //   });
  // }
}
