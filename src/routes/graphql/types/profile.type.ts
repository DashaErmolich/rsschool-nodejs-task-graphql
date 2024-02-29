import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from './uuid.type.js';
import { UserType } from './user.type.js';
import { Profile } from '../models/profile.model.js';
import { Context } from '../models/context.model.js';
import { MemberTypeType } from './member-type.type.js';
import { MemberTypeId } from '../enums/member-type.enum.js';

// model Profile {
//   id          String  @id @default(uuid())
//   isMale      Boolean
//   yearOfBirth Int
//   user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
//   userId       String     @unique
//   memberType   MemberType @relation(fields: [memberTypeId], references: [id], onDelete: Restrict)
//   memberTypeId String
// }

export const ProfileType: GraphQLObjectType<Profile, Context> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve: async ({ userId }, _args, { dataClient }, _info) => {
        const data = await dataClient.user.findFirst({ where: { id: userId } });
        return data;
      },
    },
    userId: { type: UUIDType },
    memberType: {
      type: MemberTypeType,
      resolve: async ({ memberTypeId }, _args, { dataClient }, _info) => {
        const data = await dataClient.memberType.findFirst({
          where: { id: memberTypeId },
        });
        return data;
      },
    },
    memberTypeId: { type: MemberTypeId },
  }),
});

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});
