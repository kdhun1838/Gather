import client from "./client";
import { AxiosResponse } from "axios";

//캐러셀관리
export const getCarousel = (): Promise<AxiosResponse> => {
  return client.get("/admin/getCarousel");
};

export const deleteCarousel = (carouselNum: number): Promise<AxiosResponse> => {
  return client.delete(`/admin/deleteCarousel/${carouselNum}`);
};

//유저관리
export const getUser = (): Promise<AxiosResponse> => {
  console.log("getuser API입니다");
  return client.get("/admin/getUser");
};
