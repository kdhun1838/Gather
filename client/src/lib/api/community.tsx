import client from "./client";
import { CommunityState } from "../../modules/community/type";
import { AxiosResponse } from "axios";

export const getCommunityPosts = (): Promise<AxiosResponse> => {
  console.log("커뮤니티 글을 불러옵니다.");
  return client.get("/community/list");
};

export const createCommunityPost = ({
  form,
}: CommunityState): Promise<AxiosResponse> => {
  console.log("글을 db에 저장하겠습니다.");
  return client.post("/community/create", form);
};
