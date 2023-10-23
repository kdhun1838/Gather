import client from "./client";
import { AxiosResponse } from "axios";

export const getCarousel = (): Promise<AxiosResponse> => {
  return client.get("/admin/getCarousel");
};

export const deleteCarousel = (carouselNum: number): Promise<AxiosResponse> => {
  return client.delete(`/admin/deleteCarousel/${carouselNum}`);
};
