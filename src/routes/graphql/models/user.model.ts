
import { Post } from "./post.model.js";
import { Profile } from "./profile.model.js";


export interface User {
  id: string;
  name: string;
  balance: number;
  profile: Profile;
  posts: Post[];
  // userSubscribedTo:
  // subscribedToUser:
}