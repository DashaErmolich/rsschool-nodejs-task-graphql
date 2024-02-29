import { GraphQLObjectType } from 'graphql';
import { CreatePostInputType, PostType } from '../post.type.js';
import { Context } from '../../models/context.model.js';
import { CreateUserInputType, UserType } from '../user.type.js';
import { CreateProfileInputType, ProfileType } from '../profile.type.js';
import { CreateProfileInputDto } from '../../models/profile.model.js';
import { CreateUserInputDto } from '../../models/user.model.js';
import { CreatePostInputDto } from '../../models/post.model.js';

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
    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInputType } },
      resolve: async (_source, { dto }: MutationData<CreateUserInputDto>, { dataClient }, _info) => {
        return await dataClient.user.create({ data: dto });
      },
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInputType } },
      resolve: async (_source, { dto }: MutationData<CreateProfileInputDto>, { dataClient }, _info) => {
        return await dataClient.profile.create({ data: dto });
      },
    },
  }),
});
