import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IJob } from './shared/interfaces/job.interface';
import { IProfile } from './shared/interfaces/profile.interface';
import { IRecommendedCandidate } from './shared/interfaces/recommended-candidate.interface';
import { ISkill } from './shared/interfaces/skill.interface';

@Injectable({ providedIn: 'root' })
export class JobsRankingService {
  recommendedCandidates: IRecommendedCandidate[] = [];

  jobReq: any = [];
  csv: any = [];

  constructor(private firestore: AngularFirestore) {}

  private cvSubject$ = new BehaviorSubject<any>(null);
  public cv$: Observable<any[]> = this.cvSubject$.asObservable();

  // USE THIS SERVICE TO COMMUNICATE FRO JOB REQUEST TO CV FORM

  // YOU WILL NEED TO ITERATE THORUGHT CANDIDATES AND TAKE ONLY THE ID, NAME, SKILLS

  sortCandidates(candidate: any, job: IJob) {
    let points = 0;
    const cv = candidate.cv;
    console.log(cv);
    console.log(job);
    for (let experience of cv.job) {
      for (let requiredExperience of job.exp) {
        if (
          experience.title.toString().toLowerCase() ===
          requiredExperience.exp.toString().toLowerCase()
        ) {
          const start = experience.daterange.start.seconds;
          const end = experience.daterange.end.seconds;
          const years = (end - start) / 31556926;
          console.log(years);
        }
      }
    }
    for (let certification of cv.certification) {
      for (let requiredCertification of job.certification) {
        if (
          certification.toString().toLowerCase() ===
          requiredCertification.toString().toLowerCase()
        ) {
          points++;
        }
      }
    }
    for (let skill of cv.skill) {
      for (let requiredSkill of job.skill) {
        if (
          skill.toString().toLowerCase() ===
          requiredSkill.toString().toLowerCase()
        ) {
          points++;
        }
      }
    }
    for (let language of cv.language) {
      for (let requiredLanguage of job.language) {
        if (
          language.toString().toLowerCase() ===
          requiredLanguage.toString().toLowerCase()
        ) {
          points++;
        }
      }
    }
    for (let driver of cv.driver) {
      for (let requiredDriver of job.driver) {
        if (
          driver.toString().toLowerCase() ===
          requiredDriver.toString().toLowerCase()
        ) {
          points++;
        }
      }
    }
    candidate.points = points;
    return candidate;
  }
}
