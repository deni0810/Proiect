import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../auth/login/login.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


interface UserRecognised {
  email: string;
  rol: string;
}

@Component({
  selector: 'app-employerprofile',
  templateUrl: './employerprofile.component.html',
  styleUrls: ['./employerprofile.component.scss']
})
export class EmployerprofileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    //console.log(localStorage.user.rol);
  }

}
