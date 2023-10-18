import client from "./client";
import { AxiosResponse } from "axios";

export const getCarousel = (): Promise<AxiosResponse> => {
  return client.get("/admin/getCarousel");
};
