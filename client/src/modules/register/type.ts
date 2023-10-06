import {
  changeDetailSort,
  changeForm,
  changeSort,
  postForm,
  unloadForm,
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
  popularList: any;
  sort: SortType;
  mainList: any;
};

export type RegisterState = {
  form: FormType;
  list: ListType;
  register: any;
};

export type RegisterAction =
  | ReturnType<typeof changeForm>
  | ReturnType<typeof postForm>
  | ReturnType<typeof unloadForm>
  | ReturnType<typeof changeSort>
  | ReturnType<typeof changeDetailSort>;
