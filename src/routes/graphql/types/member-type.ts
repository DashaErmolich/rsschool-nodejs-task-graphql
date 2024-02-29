import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { Profile } from "@prisma/client";

// model MemberType {
//   id                 String @id
//   discount           Float
//   postsLimitPerMonth Int
//   profiles Profile[]
// }

export interface MemberType {
  id: string,
  discount: number,
  postsLimitPerMonth: number,
  profiles: Profile[],
}

export const MemberTypeType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: UUIDType },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});
