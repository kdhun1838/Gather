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
// export const getUser = (): Promise<AxiosResponse> => {
//   return client.get("/admin/getUser");
// };

export const deleteUser = (userNum: number): Promise<AxiosResponse> => {
  console.log("유저삭제API", userNum);
  return client.delete(`/admin/deleteUser/${userNum}`);
};

export const updateUserGrade = (
  userNum: number,
  grade: number
): Promise<AxiosResponse> => {
  console.log("유저등급API", userNum, grade);
  return client.post("/admin/updateUserGrade", { userNum, grade });
};
