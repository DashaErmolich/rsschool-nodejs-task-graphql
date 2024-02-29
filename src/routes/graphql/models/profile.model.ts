import { MemberType } from './member-type.model.js';
import { User } from './user.model.js';

export interface Profile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  user: User;
  userId: string;
  memberType: MemberType;
  memberTypeId: string;
}

export type CreateProfileInputDto = Pick<
  Profile,
  'userId' | 'memberTypeId' | 'isMale' | 'yearOfBirth'
>;
