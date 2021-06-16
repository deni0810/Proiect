import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IJob } from './shared/interfaces/job.interface';
import { IRecommendedCandidate } from './shared/interfaces/recommended-candidate.interface';

@Injectable({ providedIn: 'root' })
export class JobsRankingService {
  recommendedCandidates: IRecommendedCandidate[] = [];

  jobReq: any = [];
  csv: any = [];

  private cvSubject$ = new BehaviorSubject<any>(null);
  public cv$: Observable<any[]> = this.cvSubject$.asObservable();

  sortCandidates(candidate: any, job: IJob) {
    let points = 0;
    const cv = candidate.cv;
    for (let experience of cv.job) {
      for (let requiredExperience of job.exp) {
        if (
          experience.title.toString().toLowerCase() ===
          requiredExperience.exp.toString().toLowerCase()
        ) {
          const start = experience.daterange.start.seconds;
          const end = experience.daterange.end.seconds;
          const years = (end - start) / 31556926;
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
