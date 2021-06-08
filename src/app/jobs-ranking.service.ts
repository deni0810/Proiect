import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRecommendedCandidate } from './shared/interfaces/recommended-candidate.interface';



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


  compare() {
    this.firestore.collection('CVS').valueChanges().subscribe((val) => {
      this.csv = val;
      let cvArray: any[] = [];
      this.firestore.collection<any>('JobReq').valueChanges().subscribe((jobReq)=>{
        for(let cv of this.csv) {
          for(let s of cv.skill) {
           const skill = s;
           for(let job of jobReq) {
            const jobSkill = job.skill;
            for(let jSkill of jobSkill) {
              if(skill.skill === jSkill.skill) {
                const cvLevel = skill.level;
                const jobLevel = jSkill.level;
                if(cvLevel >= jobLevel) {
                 cvArray.push(cv);
                }
              }
            }
           }
          }
        }
        this.cvSubject$.next(cvArray);
      });
    });
  }
}
