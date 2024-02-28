import { GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";

// model Post {
//   id      String @id @default(uuid())
//   title   String
//   content String
//   author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
//   authorId String
// }

export const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: {type: UUIDType},
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    author: { type: UserType },
    authorId: {type: UUIDType},
  })
})