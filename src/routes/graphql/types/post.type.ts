import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.type.js';
import { UserType } from './user.type.js';
import { Post } from '../models/post.model.js';
import { Context } from '../models/context.model.js';

// model Post {
//   id      String @id @default(uuid())
//   title   String
//   content String
//   author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
//   authorId String
// }

export const PostType: GraphQLObjectType<Post, Context> = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: async ({ authorId }, _args, { dataClient }, _info) => {
        const data = await dataClient.user.findFirst({ where: { id: authorId } });
        return data;
      },
    },
    authorId: { type: UUIDType },
  }),
});

export const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    authorId: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    authorId: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});
