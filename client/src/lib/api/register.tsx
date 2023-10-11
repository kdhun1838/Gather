import client from "./client";
import { AxiosResponse } from "axios";
import { RegisterState } from "../../modules/register/type";

export const registerForm = ({
  form,
}: RegisterState): Promise<AxiosResponse> => {
  console.log("dddddddddd", form);
  return client.post("/register", form);
};

export const list = (): Promise<AxiosResponse> => {
  console.log("ss");
  return client.get("/register/list");
};

export const getForm = (postId: Number): Promise<AxiosResponse> => {
  console.log('postid????', postId);
  return client.get("/register/post/:postId", {params: postId});
};