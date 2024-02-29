import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { User } from './user.js';
import { MemberType } from './member-type.js';

// model Profile {
//   id          String  @id @default(uuid())
//   isMale      Boolean
//   yearOfBirth Int
//   user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
//   userId       String     @unique
//   memberType   MemberType @relation(fields: [memberTypeId], references: [id], onDelete: Restrict)
//   memberTypeId String
// }

export interface Profile {
  id: string,
  isMale: boolean,
  yearOfBirth: number,
  user: User,
  userId: string,
  memberType: MemberType,
  memberTypeId: string,
}

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: GraphQLString },
  }),
});
