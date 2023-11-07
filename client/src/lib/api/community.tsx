import client from "./client";
import {
  CommunityState,
  FormType,
  SortType,
} from "../../modules/community/type";
import { AxiosResponse } from "axios";

// 포스트 관련
export const getCommunityPosts = (data: SortType): Promise<AxiosResponse> => {
  return client.get("/community/list", { params: data });
};

export const createCommunityPost = (form: {
  form: CommunityState;
  userId: string;
}): Promise<AxiosResponse> => {
  return client.post("/community/create", form);
};

export const getPost = (postId: { postId: number }): Promise<AxiosResponse> => {
  const id = postId.postId;
  return client.get(`/community/post/${id}`);
};

export const getPopularPosts = (): Promise<AxiosResponse> => {
  return client.get("/community/popularPosts");
};

// 포스트 수정 관련
export const getEditPost = (
  postId: Record<string, string>
): Promise<AxiosResponse> => {
  const id = postId["postId"];
  console.log(id);
  return client.get(`/community/edit/${id}`);
};

export const editPost = (data: { form: FormType; postId: string }) => {
  return client.post("/community/editPost", data);
};

//포스트 삭제 관련
export const deletePost = (postId: number) => {
  return client.post("/community/delete", postId);
};

//포스트 댓글관련
export const getComments = (postId: {
  postId: number;
}): Promise<AxiosResponse> => {
  const id = postId.postId;
  return client.get(`/community/comment/${id}`);
};

export const getReplys = (postId: {
  postId: number;
}): Promise<AxiosResponse> => {
  const id = postId.postId;
  return client.get(`/community/reply/${id}`);
};

export const addComment = (comment: string): Promise<AxiosResponse> => {
  return client.post("/community/addComment", { comment });
};

export const addReply = (data: {
  userId: number;
  postId: number;
  commentId: number;
  reply: string;
  isfirst: boolean;
}): Promise<AxiosResponse> => {
  return client.post("/community/addReply", { data });
};

//즐겨찾기
export const addFavoritePost = (postId: number): Promise<AxiosResponse> => {
  return client.post("/community/addFavorite", { postId });
};
