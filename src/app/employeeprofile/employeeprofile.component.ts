import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CvformComponent } from '../cvform/cvform.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.scss']
})
export class EmployeeprofileComponent implements OnInit {

  items: any;

  constructor(public dialog: MatDialog,
    private router: Router) { }


  redirectCV(){
    this.router.navigate(['cvform']);
  }

  ngOnInit(): void {
  }

}
