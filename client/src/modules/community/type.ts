// import {
//   changeDetailSort,
//   changeForm,
//   changeSort,
//   getList,
//   postForm,
//   unloadForm,
//   initSort,
//   getForm,
//   postClose,
//   postDelete,
//   changeComment,
//   postComment,
//   changeRecruit,
//   unloadComment,
//   getOriginalForm,
// } from "./action";

import { getSearchParamsForLocation } from "react-router-dom/dist/dom";
import { changeComment, changeDetailSort, changeForm, changeRecruit, changeSort, getList, getOriginalForm, initSort, postClose, postComment, postDelete, postForm, unloadComment, unloadForm } from "../register/action";

type FormType = {
  title: string;
  category: string;
  personnel: number;
  online: string;
  position: string;
  contact: string;
  period: string;
  content: string;
};

type DetailType = {
  time?: string;
  view?: string;
  like?: string;
};

type SortType = {
  mainSort?: string;
  detailSort?: DetailType;
  search?: string;
  recruit?: boolean;
};

type ListType = {
  popularList: ListDetailType[];
  sort: SortType;
  mainList: any;
};

export type ListDetailType = {
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
  createdAt: Date;
  updatedAt: Date;
};

export type CommentType = {
  comment: string;
};

export type RegisterState = {
  form: FormType;
  list: ListType;
  register: any;
  formData: any;
  registerComment: CommentType;
};

export type GetListType = SortType;

export type RegisterAction =
  | ReturnType<typeof changeForm>
  | ReturnType<typeof postForm>
  | ReturnType<typeof unloadForm>
  | ReturnType<typeof initSort>
  | ReturnType<typeof changeSort>
  | ReturnType<typeof changeDetailSort>
  | ReturnType<typeof getList>
  | ReturnType<typeof getSearchParamsForLocation>
  | ReturnType<typeof postClose>
  | ReturnType<typeof postDelete>
  | ReturnType<typeof changeComment>
  | ReturnType<typeof postComment>
  | ReturnType<typeof changeRecruit>
  | ReturnType<typeof unloadComment>
  | ReturnType<typeof getOriginalForm>
