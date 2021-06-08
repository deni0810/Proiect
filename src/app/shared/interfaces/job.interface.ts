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
<<<<<<< HEAD
  skill: ISkill;
=======
  createdBy: string;
>>>>>>> 2c21bb6ec964000ab1c168a4b9ded9cf51daa033
}
