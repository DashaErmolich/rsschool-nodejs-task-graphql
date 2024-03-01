import { User } from "./user.model.js";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  authorId: string;
}

export type CreatePostInputDto = Pick<Post, 'content' | 'title'| 'authorId'>

export type ChangePostInputDto = {
  id: string,
  dto: CreatePostInputDto,
}