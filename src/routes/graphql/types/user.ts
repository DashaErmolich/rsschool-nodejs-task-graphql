import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';

// model User {
//   id      String @id @default(uuid())
//   name    String
//   balance Float
//   profile          Profile?
//   posts            Post[]
//   userSubscribedTo SubscribersOnAuthors[] @relation("subscriber")
//   subscribedToUser SubscribersOnAuthors[] @relation("author")
// }

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    // posts: { type: new GraphQLList(PostType) },
    // profile: {
    //   type: ProfileType,
    //   resolve: (v) => console.log(v),
    // },
  }),
});
