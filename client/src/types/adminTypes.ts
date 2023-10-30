import { CarouselData } from "../components/admin/carousel/AdminCarouselManage";

export interface UserInfo {
  count: number;
  rows: {
    addr: string;
    age: number;
    createdAt: Date;
    email: string;
    gender: string;
    grade: number;
    id: string;
    name: string;
    nick: string;
    tel: string;
    updatedAt: Date;
    userNum: number;
  }[];
  today: number;
}

export interface RegisterInfo {
  count: number;
  rows: {
    registerNum: number;
    title: string;
    category: string;
    personnel: number;
    meeting: string;
    position: string;
    contact: string;
    period: string;
    content: string;
    view: number;
    favorite: number;
    state: number;
    createdAt: Date;
    updatedAt: Date;
    userNum: number;
  }[];
  today: number;
}

export interface CommunityInfo {
  count: number;
  rows: {
    category: string;
    communityNum: number;
    content: string;
    createdAt: Date;
    detail: string;
    title: string;
    updatedAt: Date;
    userId: number;
    view: number;
  }[];
  today: number;
}

export interface CarouselInfo {
  count: number;
  rows: CarouselData[];
  today: number;
}
