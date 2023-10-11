import {
  changeDetailSort,
  changeForm,
  changeSort,
  getList,
  postForm,
  unloadForm,
  initSort,
} from "./action";

type FormType = {
  title: string;
  category: string;
  personnel: number;
  online: string;
  position: string;
  contact: string;
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

export type RegisterState = {
  form: FormType;
  list: ListType;
  register: any;
};

export type GetListType = SortType;

export type RegisterAction =
  | ReturnType<typeof changeForm>
  | ReturnType<typeof postForm>
  | ReturnType<typeof unloadForm>
  | ReturnType<typeof initSort>
  | ReturnType<typeof changeSort>
  | ReturnType<typeof changeDetailSort>
  | ReturnType<typeof getList>;
