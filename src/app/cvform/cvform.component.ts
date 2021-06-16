import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { JobsRankingService } from '../jobs-ranking.service';

@Component({
  selector: 'cvform',
  templateUrl: './cvform.component.html',
  styleUrls: ['./cvform.component.scss'],
})
export class CvformComponent implements OnInit {
  private submissionForm!: AngularFirestoreCollection<any>;

  myForm!: FormGroup;


  submitting = false;
  submitted = false;

  recommendedCandidates;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private jobsRankingService: JobsRankingService
  ) {
    this.recommendedCandidates = this.jobsRankingService.recommendedCandidates;
  }

  ngOnInit() {
    this.submissionForm = this.firestore.collection('CVS');

    this.myForm = this.fb.group({
      email: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      country: ['', Validators.required],
      town: ['', Validators.required],
      profession: [''],
      hobbie: this.fb.array([]),
      skill: this.fb.array([], [Validators.required]),
      language: this.fb.array([], [Validators.required]),
      job: this.fb.array([], [Validators.required]),
      education: this.fb.array([], [Validators.required]),
      certification: this.fb.array([]),
      driver: this.fb.array([]),
      terms: ['', Validators.requiredTrue],
    });
  }

  get hobbieForms() {
    return this.myForm.get('hobbie') as FormArray;
  }

  addhobbie() {
    const hobbie = this.fb.group({
      hobbie: [''],
    });

    this.hobbieForms.push(hobbie);
  }

  deletehobbie(i: any) {
    this.hobbieForms.removeAt(i);
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

  addlanguage() {
    const language = this.fb.group({
      language: ['', [Validators.required]],
      level: ['', [Validators.required]],
    });

    this.languageForms.push(language);
  }

  deletelanguage(i: any) {
    this.languageForms.removeAt(i);
  }

  get jobForms() {
    return this.myForm.get('job') as FormArray;
  }

  addjob() {
    const job = this.fb.group({
      title: ['', [Validators.required]],
      company: ['', [Validators.required]],
      details: ['', [Validators.required]],
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
    });

    this.jobForms.push(job);
  }

  deletejob(i: any) {
    this.jobForms.removeAt(i);
  }

  get educationForms() {
    return this.myForm.get('education') as FormArray;
  }

  addeducation() {
    const education = this.fb.group({
      studies: ['', [Validators.required]],
      location: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      description: [''],

      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
    });

    this.educationForms.push(education);
  }

  deleteeducation(i: any) {
    this.educationForms.removeAt(i);
  }

  get certificationForms() {
    return this.myForm.get('certification') as FormArray;
  }

  addcertification() {
    const certification = this.fb.group({
      certification: [''],
    });

    this.certificationForms.push(certification);
  }

  deletecertification(i: any) {
    this.certificationForms.removeAt(i);
  }

  get driverForms() {
    return this.myForm.get('driver') as FormArray;
  }

  adddriver() {
    const driver = this.fb.group({
      driver: [''],
    });

    this.driverForms.push(driver);
  }

  deletedriver(i: any) {
    this.driverForms.removeAt(i);
  }

  async submitData(value: any) {
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
}
