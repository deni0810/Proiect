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

  constructor(private firestore: AngularFirestore){}

  private cvSubject$ = new BehaviorSubject<any>(null);
  public cv$: Observable<any[]> = this.cvSubject$.asObservable();

  // USE THIS SERVICE TO COMMUNICATE FRO JOB REQUEST TO CV FORM

  // YOU WILL NEED TO ITERATE THORUGHT CANDIDATES AND TAKE ONLY THE ID, NAME, SKILLS

  // sortam atunci cand:
  // - avem mai multi useri ce au aplicat la un job
  // -

  compare() {

    this.firestore.collection('CVS').valueChanges().subscribe((csv) => {
      this.firestore.collection<any>('JobReq').valueChanges().subscribe((jobReq)=>{
        console.log(this.csv);
        console.log(csv)
  //      this.cvSubject$.next(cvArray);
      });
    });
  }

  sortCandidates(candidate: any, job: IJob) {
    let points = 0;
    const cv = candidate.cv;
    console.log(cv.certification);
    console.log(job);
    for(let certification of cv.certification) {
      for(let requiredCertification of job.certification) {
        if(certification.toString().toLowerCase() === requiredCertification.toString().toLowerCase()) {
          points++;
        }
      }
    }
    for(let skill of cv.skill){
      for(let requiredSkill of job.skill){
        if(skill.toString().toLowerCase() === requiredSkill.toString().toLowerCase()){
          points++;
        }
      }
    }
    for(let language of cv.language){
      for(let requiredLanguage of job.language){
        if(language.toString().toLowerCase() === requiredLanguage.toString().toLowerCase()){
          points++;
        }
      }
    }
    for(let driver of cv.driver){
      for(let requiredDriver of job.driver){
        if(driver.toString().toLowerCase() === requiredDriver.toString().toLowerCase()){
          points++;
        }
      }
    }
  }
}
