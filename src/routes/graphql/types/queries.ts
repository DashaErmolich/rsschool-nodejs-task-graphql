import { GraphQLObjectType } from 'graphql';
import { UserType } from './user.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',

  fields: () => ({
    user: {
      type: UserType,
      resolve: () => { data: 'test' }
    },
    users: {
      type: UserType,
      resolve: () => { data: 'test' }
    },
  }),
});
