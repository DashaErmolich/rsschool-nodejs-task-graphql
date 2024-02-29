import { User } from "./user.model.js";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  authorId: string;
}