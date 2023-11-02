import client from "./client";
import { AxiosResponse } from "axios";

//메인
export const getTopInfo = (): Promise<AxiosResponse> => {
  return client.get("/admin/topInfo");
};

export const getVisitor = (): Promise<AxiosResponse> => {
  return client.get("/admin/visitor");
};

//캐러셀관리
export const getCarousel = (): Promise<AxiosResponse> => {
  return client.get("/admin/getCarousel");
};

export const deleteCarousel = (carouselNum: number): Promise<AxiosResponse> => {
  return client.delete(`/admin/deleteCarousel/${carouselNum}`);
};

//유저관리

export const deleteUser = (userNum: number): Promise<AxiosResponse> => {
  console.log("유저삭제API", userNum);
  return client.delete(`/admin/deleteUser/${userNum}`);
};

export const updateUserGrade = (
  userNum: number,
  grade: number
): Promise<AxiosResponse> => {
  return client.post("/admin/updateUserGrade", { userNum, grade });
};

export const getUserDetail = (userNum: number): Promise<AxiosResponse> => {
  console.log("유저디테일 api", userNum);
  return client.get(`/admin/getUserDetail/${userNum}`);
};

// 모임게시판관리

export const getRegister = (): Promise<AxiosResponse> => {
  return client.get("/admin/getRegister");
};

// 커뮤니티게시판 관리

export const getCommunityWithUser = (): Promise<AxiosResponse> => {
  console.log("API");
  return client.get("/admin/getCommunity");
};
