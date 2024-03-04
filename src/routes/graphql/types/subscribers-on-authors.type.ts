import { GraphQLObjectType } from "graphql";
import { SubscribersOnAuthors } from "../models/subscribers-on-authors.model.js";
import { Context } from "../models/context.model.js";
import { UserType } from "./user.type.js";
import { UUIDType } from "./uuid.type.js";
import DataLoader from "dataloader";

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
      resolve: async ({ subscriberId }, _args, { dataClient, dataLoaders }, info) => {
        const data = await dataClient.user.findFirst({ where: { id: subscriberId } });
        return data;
        // let dl = dataLoaders.get(info.fieldNodes);
        // if (!dl) {
        //   dl = new DataLoader(async (ids: readonly string[]) => {
        //     return await dataClient.user.findMany({
        //       where: { id: { in: ids as string[] } },
        //     });
        //   });
        //   dataLoaders.set(info.fieldNodes, dl);
        //   console.log(dataLoaders);
        // }
        // return dl.load(subscriberId);
      },
    },
    subscriberId: { type: UUIDType },
    author: {
      type: UserType,
      resolve: async ({ authorId }, _args, { dataClient, dataLoaders }, info) => {
        // const data = await dataClient.user.findFirst({ where: { id: authorId } });
        // return data;
        let dl = dataLoaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const results = await dataClient.user.findMany({
              where: { id: { in: ids as string[] } },
            });
            const sortedInIdsOrder = ids.map(id => results.find(x => x.id === id));
            return sortedInIdsOrder;
          });
          dataLoaders.set(info.fieldNodes, dl);
          console.log(dataLoaders);
        }
        return dl.load(authorId);
      },
    },
    authorId: { type: UUIDType },
  }),
});