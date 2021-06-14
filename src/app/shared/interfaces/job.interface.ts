import { IExperience } from "./experience.interface";
import { ISkill } from "./skill.interface";

export interface IJob {
  id: string;
  company: string;
  aboutcompany: string;
  salary: string;
  aboutjob: string;
  schedule: string;
  language: {
    language: string;
    level: string;
  };
  exp: IExperience;
  jobCandidates: string[];
  skill: ISkill;
  createdBy: string;
}
