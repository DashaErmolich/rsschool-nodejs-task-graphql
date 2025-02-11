import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.type.js';
import { PostType } from './post.type.js';
import { ProfileType } from './profile.type.js';
import { Context } from '../models/context.model.js';
import { User } from '../models/user.model.js';

// model User {
//   id      String @id @default(uuid())
//   name    String
//   balance Float
//   profile          Profile?
//   posts            Post[]
//   userSubscribedTo SubscribersOnAuthors[] @relation("subscriber")
//   subscribedToUser SubscribersOnAuthors[] @relation("author")
// }

export const UserType: GraphQLObjectType<User, Context> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async ({ id }, _args, { dataClient }, _info) => {
        const data = await dataClient.profile.findFirst({ where: { userId: id } });
        return data;
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }, _args, { dataClient }, _info) => {
        const data = await dataClient.post.findMany({ where: { authorId: id } });
        return data;
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }, _args, { dataClient }, _info) => {
        const data = await dataClient.subscribersOnAuthors.findMany({
          where: { subscriberId: id },
          select: { author: true },
        });
        return data.map((v) => v.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }, _args, { dataClient }, _info) => {
        const data = await dataClient.subscribersOnAuthors.findMany({
          where: { authorId: id },
          select: { subscriber: true },
        });
        return data.map((v) => v.subscriber);
      },
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
