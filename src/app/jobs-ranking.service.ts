import { Injectable } from "@angular/core";

interface RecommendedCandidate {
    id?: string;
    name: string;
    skills: Skill[];
}

interface Skill {
    level: number;
    skill: string;
}

@Injectable({providedIn: 'root'})
export class JobsRankingService {
    recommendedCandidates: RecommendedCandidate[] = [];



    // USE THIS SERVICE TO COMMUNICATE FRO JOB REQUEST TO CV FORM


    // YOU WILL NEED TO ITERATE THORUGHT CANDIDATES AND TAKE ONLY THE ID, NAME, SKILLS



    

}