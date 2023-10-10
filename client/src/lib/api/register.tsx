import client from "./client";
import { AxiosResponse } from "axios";
import { GetListType, RegisterState } from "../../modules/register/type";

export const registerForm = ({
  form,
}: RegisterState): Promise<AxiosResponse> => {
  console.log("dddddddddd", form);
  return client.post("/register", form);
};

export const getList = (data: GetListType): Promise<AxiosResponse> => {
  console.log("API의 getList입니다");
  return client.get("/register/list", { params: data });
};
