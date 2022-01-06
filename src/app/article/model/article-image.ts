import {Post} from "./post";

export interface ArticleImage {
  id: number;
  name: string;
  type: string;
  post: Post;
}
