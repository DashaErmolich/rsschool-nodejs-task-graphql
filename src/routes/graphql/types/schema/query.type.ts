import { GraphQLList, GraphQLObjectType } from 'graphql';
import { UserType } from '../user.type.js';
import { MemberType, Post } from '@prisma/client';
import { PostType } from '../post.type.js';
import { MemberTypeType } from '../member-type.type.js';
import { ProfileType } from '../profile.type.js';
import { Context } from '../../models/context.model.js';
import { UUIDType } from '../uuid.type.js';
import { MemberTypeId } from '../../enums/member-type.enum.js';
import { User } from '../../models/user.model.js';
import { Profile } from '../../models/profile.model.js';
import DataLoader from 'dataloader';

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
      resolve: async (_source, { id: memberTypeId }: MemberType, { dataClient, dataLoaders }, info) => {
        // const data = await dataClient.memberType.findFirst({ where: { id: memberTypeId } });
        // return data;

        let dl = dataLoaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const results = await dataClient.memberType.findMany({ where: { id: { in: ids as string[] } } });
            const sortedInIdsOrder = ids.map(id => results.find(x => x.id === id));
            return sortedInIdsOrder;
          });
          dataLoaders.set(info.fieldNodes, dl);
        }
        return dl.load(memberTypeId);
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
      resolve: async (_source, { id: profileId }: Profile, { dataClient, dataLoaders }, info) => {
        // const data = await dataClient.profile.findFirst({ where: { id: profileId } });
        // return data;

        let dl = dataLoaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const results = await dataClient.profile.findMany({ where: { id: { in: ids as string[] } } });
            const sortedInIdsOrder = ids.map(id => results.find(x => x.id === id));
            return sortedInIdsOrder;
          });
          dataLoaders.set(info.fieldNodes, dl);
        }
        return dl.load(profileId);
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
      resolve: async (_source, { id: postId }: Post, { dataClient, dataLoaders }, info) => {
        // const data = await dataClient.post.findFirst({ where: { id: postId } });
        // return data;
        let dl = dataLoaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const results = await dataClient.post.findMany({ where: { id: { in: ids as string[] } } });
            const sortedInIdsOrder = ids.map(id => results.find(x => x.id === id));
            return sortedInIdsOrder;
          });
          dataLoaders.set(info.fieldNodes, dl);
        }
        return dl.load(postId);
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
      resolve: async (_source, { id: userId }: User, { dataClient, dataLoaders }, info) => {
        // const data = await dataClient.user.findFirst({ where: { id: userId } });
        // return data;
        let dl = dataLoaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const results = await dataClient.user.findMany({ where: { id: { in: ids as string[] } } });
            const sortedInIdsOrder = ids.map(id => results.find(x => x.id === id));
            return sortedInIdsOrder;
          });
          dataLoaders.set(info.fieldNodes, dl);
        }
        return dl.load(userId);
      },
    },
  }),
});
