import { IExperience } from "./experience.interface";
import { ILanguage } from "./language.interface";
import { ISkill } from "./skill.interface";

export interface IJob {
  id: string;
  company: string;
  aboutcompany: string;
  salary: string;
  aboutjob: string;
  schedule: string;
  language: ILanguage[];
  exp: IExperience[];
  jobCandidates: string[];
  skill: ISkill[];
  createdBy: string;
  certification: any[];
  driver: string;
}
