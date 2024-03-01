import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema } from 'graphql';
import { QueryType } from './types/schema/query.type.js';
import { MutationType } from './types/schema/mutation.type.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const gqlSchema: GraphQLSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
