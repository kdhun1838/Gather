import client from "./client";
import { AxiosResponse } from "axios";
import { GetListType, RegisterState } from "../../modules/register/type";

export const registerForm = ({
  form,
}: RegisterState): Promise<AxiosResponse> => {
  return client.post("/register", form);
};
export const getList = (data: GetListType): Promise<AxiosResponse> => {
  return client.get("/register/list", { params: data });
};

export const getPopularList = (): Promise<AxiosResponse> => {
  console.log("API의 getPopularList");
  return client.get("/register/popularList");
};
export const getForm = (postId: Number): Promise<AxiosResponse> => {
  return client.get("/register/post/:postId", { params: postId });
};

export const postClose = (postId: Number): Promise<AxiosResponse> => {
  return client.post(`/register/close/${postId}`, postId);
};

export const postDelete = (postId: Number): Promise<AxiosResponse> => {
  return client.post(`/register/delete/${postId}`, postId);
};

export const postComment = ({ comment, postId }: { comment: RegisterState; postId: number }): Promise<AxiosResponse> => {
  console.log("asdfasfsafsadf", comment, postId)
  return client.post(`/register/postComment/${postId}`, { comment, postId });
}