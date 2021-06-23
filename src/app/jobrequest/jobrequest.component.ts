import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { JobsRankingService } from '../jobs-ranking.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IJob } from '../shared/interfaces/job.interface';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-jobrequest',
  templateUrl: './jobrequest.component.html',
  styleUrls: ['./jobrequest.component.scss'],
})
export class JobrequestComponent implements OnInit {
  submissionForm!: AngularFirestoreCollection<any>;

  myForm!: FormGroup;

  submitting = false;
  submitted = false;
  job: IJob;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private jobsRankingService: JobsRankingService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private jobsService: JobsService
  ) {
    Validators.required;
    this.job = data;
  }

  // sortCandidatesByRanking() {
  //   return this.jobsRankingService.recommendedCandidates.sort();
  // }

  ngOnInit() {
    this.firestore
      .collection('JobReq')
      .valueChanges()
      .subscribe((response) => {
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
      terms: ['', Validators.requiredTrue],
    });

    if(this.job) {
      for(let language of this.job.language) {
        this.addlanguage(language);
      }
      for(let exp of this.job.exp) {
        this.addexp(exp);
      }
      for(let certification of this.job.certification) {
        this.addcertification(certification);
      }
      for(let driver of this.job.driver) {
        this.adddriver(driver);
      }
    }
  }

  get skillForms() {
    return this.myForm.get('skill') as FormArray;
  }

  addskill() {
    const skill = this.fb.group({
      skill: ['', [Validators.required]],
      level: ['', [Validators.required]],
    });

    this.skillForms.push(skill);
  }

  deleteskill(i: any) {
    this.skillForms.removeAt(i);
  }

  get languageForms() {
    return this.myForm.get('language') as FormArray;
  }

  addlanguage(lang?: any) {
    const language = this.fb.group({
      language: [lang? lang.language:'', [Validators.required]],
      level: [lang? lang.level:'', [Validators.required]],
    });

    this.languageForms.push(language);
  }

  deletelanguage(i: any) {
    this.languageForms.removeAt(i);
  }

  get expForms() {
    return this.myForm.get('exp') as FormArray;
  }

  addexp(experience: any = null) {
    const newExp = this.fb.group({
      exp: [experience? experience.exp:'', [Validators.required]],
      years: [experience? experience.years:'', [Validators.required]],
      jobdetails: [experience? experience.jobdetails:'', [Validators.required]],
    });

    this.expForms.push(newExp);
  }

  deleteexp(i: any) {
    this.expForms.removeAt(i);
  }

  get certificationForms() {
    return this.myForm.get('certification') as FormArray;
  }

  addcertification(certif: any = null) {
    const certification = this.fb.group({
      certification: [certif? certif.certification:''],
    });

    this.certificationForms.push(certification);
  }

  deletecertification(i: any) {
    this.certificationForms.removeAt(i);
  }

  get driverForms() {
    return this.myForm.get('driver') as FormArray;
  }

  adddriver(driverLicense: any = null) {
    const driver = this.fb.group({
      driver: [driverLicense? driverLicense.driver:''],
    });

    this.driverForms.push(driver);
  }

  deletedriver(i: any) {
    this.driverForms.removeAt(i);
  }

  submitData(value: any) {
    const createdBy = JSON.parse(localStorage.getItem('userData')!).id;
    const data = { ...value, createdBy };
    this.submitting = true;
    this.submissionForm
      .add(data)
      .then((res) => {
        this.submitted = true;
        alert('Succes!');
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.submitting = false;
      });
  }

  updateJob() {
    this.jobsService.updateJob(this.job)
  }
}
