import client from "./client";
import { AxiosResponse } from "axios";

//메인
export const getTopInfo = (): Promise<AxiosResponse> => {
  return client.get("/admin/topInfo");
};

export const getVisitor = (): Promise<AxiosResponse> => {
  return client.get("/admin/visitor");
};

export const getWeekRegister = (): Promise<AxiosResponse> => {
  return client.get("/admin/weekRegister");
};

export const getMessages = (): Promise<AxiosResponse> => {
  console.log("메시지API");
  return client.get("/admin/getMessages");
};

export const postMessages = (
  text: string,
  userNum: number
): Promise<AxiosResponse> => {
  console.log("포스트메시지 API");
  return client.post("/admin/postMessages", { text, userNum });
};

export const deleteMessages = (messageNum: number): Promise<AxiosResponse> => {
  return client.post(`/admin/postDelete/${messageNum}`);
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
  return client.delete(`/admin/deleteUser/${userNum}`);
};

export const updateUserGrade = (
  userNum: number,
  grade: number
): Promise<AxiosResponse> => {
  return client.post("/admin/updateUserGrade", { userNum, grade });
};

export const getUserDetail = (userNum: number): Promise<AxiosResponse> => {
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
