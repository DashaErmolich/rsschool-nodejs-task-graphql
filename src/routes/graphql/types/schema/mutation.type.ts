import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { CreatePostInputType, PostType } from '../post.type.js';
import { Context } from '../../models/context.model.js';
import { CreateUserInputType, UserType } from '../user.type.js';
import { CreateProfileInputType, ProfileType } from '../profile.type.js';
import { CreateProfileInputDto, Profile } from '../../models/profile.model.js';
import { CreateUserInputDto, User } from '../../models/user.model.js';
import { CreatePostInputDto, Post } from '../../models/post.model.js';
import { UUIDType } from '../uuid.type.js';

interface MutationData<T> {
  dto: T;
}

export const MutationType: GraphQLObjectType<
  unknown,
  Context
> = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: {
      type: PostType,
      args: { dto: { type: CreatePostInputType } },
      resolve: async (_source, { dto }: MutationData<CreatePostInputDto>, { dataClient }, _info) => {
        return await dataClient.post.create({ data: dto });
      },
    },
    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_source, { id: postId }: Post, { dataClient }, _info) => {
        try {
          await dataClient.post.delete({ where: { id: postId } });
          return true;
        } catch {
          return false;
        } 
      },
    },
    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInputType } },
      resolve: async (_source, { dto }: MutationData<CreateUserInputDto>, { dataClient }, _info) => {
        return await dataClient.user.create({ data: dto });
      },
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_source, { id: userId }: User, { dataClient }, _info) => {
        try {
          await dataClient.user.delete({ where: { id: userId } });
          return true;
        } catch {
          return false;
        }
      },
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInputType } },
      resolve: async (_source, { dto }: MutationData<CreateProfileInputDto>, { dataClient }, _info) => {
        return await dataClient.profile.create({ data: dto });
      },
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_source, { id: profileId }: Profile, { dataClient }, _info) => {
        try {
          await dataClient.profile.delete({ where: { id: profileId } });
          return true;
        } catch {
          return false;
        }
      },
    },
  }),
});
