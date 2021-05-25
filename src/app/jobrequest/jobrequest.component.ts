import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { JobsRankingService } from '../jobs-ranking.service';

@Component({
  selector: 'app-jobrequest',
  templateUrl: './jobrequest.component.html',
  styleUrls: ['./jobrequest.component.scss']
})
export class JobrequestComponent implements OnInit {
  submissionForm!: AngularFirestoreCollection<any>;

  myForm!: FormGroup;

  submitting = false;
  submitted = false;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore, private jobsRankingService: JobsRankingService) { Validators.required}

  sortCandidatesByRanking() {
    return this.jobsRankingService.recommendedCandidates.sort();
  }

  ngOnInit() {
   this.firestore.collection('JobReq').valueChanges().subscribe((response)=>{
      this.jobsRankingService.jobReq = response;
    });

    this.submissionForm = this.firestore.collection('JobReq');

    this.myForm = this.fb.group({

      aboutcompany: ['', Validators.required],
      aboutjob: ['', Validators.required],
      salary: ['', Validators.required],
      schedule: ['', Validators.required],
      skill: this.fb.array([], [Validators.required]),
      language: this.fb.array([], [Validators.required]),
      exp: this.fb.array([], [Validators.required]),
      certification: this.fb.array([]),
      driver: this.fb.array([]),
      terms: ['', Validators.requiredTrue]







    })



  }

  get skillForms() {
    return this.myForm.get('skill') as FormArray
  }

  addskill() {

    const skill = this.fb.group({
      skill: ['',[Validators.required]],
      level: ['',[Validators.required]],


    })

    this.skillForms.push(skill);
  }

  deleteskill(i:any) {
    this.skillForms.removeAt(i)
  }

  get languageForms() {
    return this.myForm.get('language') as FormArray
  }

  addlanguage() {

    const language = this.fb.group({
      language: ['',[Validators.required]],
      level: ['',[Validators.required]]
    })

    this.languageForms.push(language);
  }

  deletelanguage(i:any) {
    this.languageForms.removeAt(i)
  }


  get expForms() {
    return this.myForm.get('exp') as FormArray
  }

  addexp() {

    const exp = this.fb.group({
      exp: ['',[Validators.required]],
      years: ['',[Validators.required]],
      jobdetails: ['',[Validators.required]]
    })

    this.expForms.push(exp);
  }

  deleteexp(i:any) {
    this.expForms.removeAt(i)
  }



  get certificationForms() {
    return this.myForm.get('certification') as FormArray
  }

  addcertification() {

    const certification = this.fb.group({
      certification: ['']
    })

    this.certificationForms.push(certification);
  }

  deletecertification(i:any) {
    this.certificationForms.removeAt(i)
  }

  get driverForms() {
    return this.myForm.get('driver') as FormArray
  }

  adddriver() {

    const driver = this.fb.group({
      driver: ['']
    })

    this.driverForms.push(driver);
  }

  deletedriver(i:any) {
    this.driverForms.removeAt(i)
  }


  submitData(value:any){

    console.log(this.submitted);

    this.submitting = true;
    this.submissionForm.add(value).then(res => {
      this.submitted = true;
      alert("Succes!");
    }).catch(err => console.log(err)
    ).finally(() => {
      this.submitting = false;
    });

  }




}
