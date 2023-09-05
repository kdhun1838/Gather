import client from "./client";
import { AxiosResponse } from "axios";

export const users = (): Promise<AxiosResponse> => {
  return client.get("/users");
};
