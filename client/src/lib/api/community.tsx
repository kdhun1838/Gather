import client from "./client";
import { CommunityState, GetPostType } from "../../modules/community/type";
import { AxiosResponse } from "axios";

export const getCommunityPosts = (
  data: GetPostType
): Promise<AxiosResponse> => {
  console.log("커뮤니티 글을 불러옵니다.");
  return client.get("/community/list", { params: data });
};

export const createCommunityPost = ({
  form,
}: CommunityState): Promise<AxiosResponse> => {
  console.log("글을 db에 저장하겠습니다.");
  return client.post("/community/create", form);
};

export const addFavoritePost = (postId: number): Promise<AxiosResponse> => {
  return client.post("/community/addFavorite", { postId });
};

export const getPost = (postId: { postId: number }): Promise<AxiosResponse> => {
  const id = postId.postId;
  return client.get(`/community/post/${id}`);
};

export const getPopularPosts = (): Promise<AxiosResponse> => {
  return client.get("/community/popularPosts");
};

export const addComment = (comment: string): Promise<AxiosResponse> => {
  return client.post("/community/addComment", { comment });
};
