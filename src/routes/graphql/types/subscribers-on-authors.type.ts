import { GraphQLObjectType } from "graphql";
import { SubscribersOnAuthors } from "../models/subscribers-on-authors.model.js";
import { Context } from "../models/context.model.js";
import { UserType } from "./user.type.js";
import { UUIDType } from "./uuid.type.js";

// model SubscribersOnAuthors {
//   subscriber   User   @relation("subscriber", fields: [subscriberId], references: [id], onDelete: Cascade)
//   subscriberId String
//   author       User   @relation("author", fields: [authorId], references: [id], onDelete: Cascade)
//   authorId     String

//   @@id([subscriberId, authorId])
// }

export const SubscribersOnAuthorsType: GraphQLObjectType<SubscribersOnAuthors, Context> = new GraphQLObjectType({
  name: 'SubscribersOnAuthors',
  fields: () => ({
    subscriber: {
      type: UserType,
      resolve: async ({ subscriberId }, _args, { dataClient }, _info) => {
        const data = await dataClient.user.findFirst({ where: { id: subscriberId } });
        return data;
      },
    },
    subscriberId: { type: UUIDType },
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