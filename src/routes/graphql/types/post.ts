import { GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { User, UserType } from "./user.js";

// model Post {
//   id      String @id @default(uuid())
//   title   String
//   content String
//   author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
//   authorId String
// }

export interface Post {
  id: string,
  title: string,
  content: string,
  author: User,
  authorId: string,
}

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