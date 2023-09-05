import client from "./client";
import { AxiosResponse } from "axios";

export const boards = (): Promise<AxiosResponse> => {
  return client.get("/boards");
};
