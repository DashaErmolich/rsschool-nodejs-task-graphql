import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { gqlSchema } from './schemas.js';
import { Context } from './models/context.model.js';
import depthLimit from 'graphql-depth-limit';

const DEPTH_LIMIT = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const context: Context = {
        dataClient: prisma,
        dataLoaders: new WeakMap(),
      };

      const depthErrors = validate(gqlSchema, parse(req.body.query), [
        depthLimit(DEPTH_LIMIT),
      ]);

      if (depthErrors.length) {
        return { data: undefined, errors: depthErrors };
      }

      const { data, errors } = await graphql({
        schema: gqlSchema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: context,
      });

      return { data, errors };
    },
  });
};

export default plugin;
