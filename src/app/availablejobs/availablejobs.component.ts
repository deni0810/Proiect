import { Component} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { JobsRankingService } from '../jobs-ranking.service';
import { JobdetailsComponent } from 'src/app/jobdetails/jobdetails.component';
import { MatDialog } from '@angular/material/dialog';
import { JobsService } from 'src/app/jobs.service';


interface Item {
  name: string;
}


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

}
