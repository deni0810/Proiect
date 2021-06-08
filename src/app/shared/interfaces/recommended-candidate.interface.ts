import { ISkill } from "./skill.interface";

export interface IRecommendedCandidate {
  id?: string;
  name: string;
  skills: ISkill[];
}
