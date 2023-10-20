import client from "./client";
import { AxiosResponse } from "axios";

export const getCarousel = (): Promise<AxiosResponse> => {
  return client.get("/admin/getCarousel");
};

export const deleteCarousel = (carouselNum: number): Promise<AxiosResponse> => {
  console.log("delete캐러셀 API", carouselNum);
  return client.delete(`/admin/deleteCarousel/${carouselNum}`);
};
