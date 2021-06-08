import { ISkill } from "./skill.interface";

export interface IJob {
  id: string;
  company: string;
  aboutcompany: string;
  salary: string;
  aboutjob: string;
  schedule: string;
  language: string;
  exp: string;
  jobCandidates: string[];
  skill: ISkill;
}
