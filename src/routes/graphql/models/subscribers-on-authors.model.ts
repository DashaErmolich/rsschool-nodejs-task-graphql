import { User } from "./user.model.js";

export interface SubscribersOnAuthors {
  subscriber: User,
  subscriberId: string,
  author: User,
  authorId: string,
}