import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { Post } from './post.js';
import { Profile } from './profile.js';

// model User {
//   id      String @id @default(uuid())
//   name    String
//   balance Float
//   profile          Profile?
//   posts            Post[]
//   userSubscribedTo SubscribersOnAuthors[] @relation("subscriber")
//   subscribedToUser SubscribersOnAuthors[] @relation("author")
// }

export interface User {
  id: string,
  name: string,
  balance: number,
  profile: Profile,
  posts: Post[],
  // userSubscribedTo:
  // subscribedToUser:
}

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
});
