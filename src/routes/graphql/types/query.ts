import { GraphQLList, GraphQLObjectType } from 'graphql';
import { User, UserType } from './user.js';
import { Post, PrismaClient } from '@prisma/client';
import { PostType } from './post.js';
import { MemberType, MemberTypeType } from './member-type.js';
import { Profile, ProfileType } from './profile.js';
import { Context } from '../interfaces/context.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',

  fields: () => ({
    users: { 
      type: new GraphQLList(UserType),
      resolve: async (source, args, context, info) => {
        const prisma: PrismaClient = (context as Context).db;
        const data = await prisma.user.findMany();
        return data;
      }
    },
    posts: { 
      type: new GraphQLList(PostType),
      resolve: async (source, args, context, info) => {
        const prisma: PrismaClient = (context as Context).db;
        const data = await prisma.post.findMany();
        return data;
      }
    },
    memberTypes: {
      type: new GraphQLList(MemberTypeType),
      resolve: async (source, args, context, info) => {
        const prisma: PrismaClient = (context as Context).db;
        const data = await prisma.memberType.findMany();
        return data;
      }
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (source, args, context, info) => {
        const prisma: PrismaClient = (context as Context).db;
        const data = await prisma.profile.findMany();
        return data;
      }
    },
  }),
});
