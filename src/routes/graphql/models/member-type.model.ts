import { Profile } from "./profile.model.js";

export interface MemberType {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
  profiles: Profile[];
}