import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberTypeId } from '../enums/member-type.enum.js';
import { ProfileType } from './profile.type.js';
import { Context } from '../models/context.model.js';
import { MemberType } from '../models/member-type.model.js';

// model MemberType {
//   id                 String @id
//   discount           Float
//   postsLimitPerMonth Int
//   profiles Profile[]
// }

export const MemberTypeType: GraphQLObjectType<MemberType, Context> =
  new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
      id: { type: MemberTypeId },
      discount: { type: GraphQLFloat },
      postsLimitPerMonth: { type: GraphQLInt },
      profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async ({ id }: MemberType, _args, { dataClient }, _info) => {
          const data = await dataClient.profile.findMany({
            where: { memberTypeId: id },
          });
          return data;
        },
      },
    }),
  });
