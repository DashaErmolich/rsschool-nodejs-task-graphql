import { GraphQLList, GraphQLObjectType } from 'graphql';
import { UserType } from './user.type.js';
import { Post } from '@prisma/client';
import { PostType } from './post.type.js';
import { MemberTypeType } from './member-type.type.js';
import { ProfileType } from './profile.type.js';
import { Context } from '../models/context.model.js';
import { UUIDType } from './uuid.type.js';
import { MemberTypeId } from '../enums/member-type.enum.js';
import { User } from '../models/user.model.js';
import { Profile } from '../models/profile.model.js';

export const QueryType: GraphQLObjectType<unknown, Context> = new GraphQLObjectType({
  name: 'Query',

  fields: () => ({
    memberTypes: {
      type: new GraphQLList(MemberTypeType),
      resolve: async (_source, _args, { dataClient }, _info) => {
        const data = await dataClient.memberType.findMany();
        return data;
      },
    },

    memberType: {
      type: MemberTypeType,
      args: {
        id: {
          type: MemberTypeId,
        },
      },
      resolve: async (_source, { id: postId }: Post, { dataClient }, _info) => {
        const data = await dataClient.memberType.findFirst({ where: { id: postId } });
        return data;
      },
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_source, _args, { dataClient }, _info) => {
        const data = await dataClient.profile.findMany();
        return data;
      },
    },

    profile: {
      type: ProfileType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_source, { id: profileId }: Profile, { dataClient }, _info) => {
        const data = await dataClient.profile.findFirst({ where: { id: profileId } });
        return data;
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (__source, __args, { dataClient }, _info) => {
        const data = await dataClient.post.findMany();
        return data;
      },
    },

    post: {
      type: PostType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_source, { id: postId }: Post, { dataClient }, _info) => {
        const data = await dataClient.post.findFirst({ where: { id: postId } });
        return data;
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async (_source, _args, { dataClient }, _info) => {
        const data = await dataClient.user.findMany();
        return data;
      },
    },

    user: {
      type: UserType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_source, { id: userId }: User, { dataClient }, _info) => {
        const data = await dataClient.user.findFirst({ where: { id: userId } });
        return data;
      },
    },
  }),
});
