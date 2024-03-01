import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { ChangePostInputType, CreatePostInputType, PostType } from '../post.type.js';
import { Context } from '../../models/context.model.js';
import { ChangeUserInputType, CreateUserInputType, UserType } from '../user.type.js';
import {
  ChangeProfileInputType,
  CreateProfileInputType,
  ProfileType,
} from '../profile.type.js';
import {
  ChangeProfileInputDto,
  CreateProfileInputDto,
  Profile,
} from '../../models/profile.model.js';
import {
  ChangeUserInputDto,
  CreateUserInputDto,
  User,
  userSubscribedTo,
} from '../../models/user.model.js';
import { ChangePostInputDto, CreatePostInputDto, Post } from '../../models/post.model.js';
import { UUIDType } from '../uuid.type.js';

interface MutationData<T> {
  dto: T;
}

export const MutationType: GraphQLObjectType<unknown, Context> = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: {
      type: PostType,
      args: { dto: { type: CreatePostInputType } },
      resolve: async (
        _source,
        { dto }: MutationData<CreatePostInputDto>,
        { dataClient },
        _info,
      ) => {
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
    changePost: {
      type: PostType,
      args: { id: { type: UUIDType }, dto: { type: ChangePostInputType } },
      resolve: async (
        _source,
        { id: postId, dto }: ChangePostInputDto,
        { dataClient },
        _info,
      ) => {
        return await dataClient.post.update({ where: { id: postId }, data: dto });
      },
    },
    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInputType } },
      resolve: async (
        _source,
        { dto }: MutationData<CreateUserInputDto>,
        { dataClient },
        _info,
      ) => {
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
    changeUser: {
      type: UserType,
      args: { id: { type: UUIDType }, dto: { type: ChangeUserInputType } },
      resolve: async (
        _source,
        { id: userId, dto }: ChangeUserInputDto,
        { dataClient },
        _info,
      ) => {
        return await dataClient.user.update({ where: { id: userId }, data: dto });
      },
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInputType } },
      resolve: async (
        _source,
        { dto }: MutationData<CreateProfileInputDto>,
        { dataClient },
        _info,
      ) => {
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
    changeProfile: {
      type: ProfileType,
      args: { id: { type: UUIDType }, dto: { type: ChangeProfileInputType } },
      resolve: async (
        _source,
        { id: profileId, dto }: ChangeProfileInputDto,
        { dataClient },
        _info,
      ) => {
        return await dataClient.profile.update({ where: { id: profileId }, data: dto });
      },
    },
    subscribeTo: {
      type: UserType,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (
        _source,
        { userId: subscriberId, authorId }: userSubscribedTo,
        { dataClient },
        _info,
      ) => {
        await dataClient.subscribersOnAuthors.create({
          data: { subscriberId, authorId },
        });
        return await dataClient.user.findFirst({ where: { id: subscriberId } });
      },
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (
        _source,
        { userId: subscriberId, authorId }: userSubscribedTo,
        { dataClient },
        _info,
      ) => {
        try {
          await dataClient.subscribersOnAuthors.deleteMany({
            where: { subscriberId, authorId },
          });
          return true;
        } catch {
          return false;
        }
      },
    },
  }),
});
