import {
  changeDetailSort,
  changeForm,
  changeSort,
  getList,
  postForm,
  unloadForm,
  initSort,
  getForm,
  postClose,
  postDelete,
  changeComment,
  postComment,
  changeRecruit,
  unloadComment,
  getOriginalForm,
  modifyForm,
  getOriginalComment,
} from "./action";

export type FormType = {
  title: string;
  category: string;
  personnel: number;
  online: string;
  position: string;
  contact: string;
  period: string;
  content: string;
  originalPostId: number;
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

export type OriginalFormType = {
  originFormData: {
    title: string;
    category: string;
    personnel: number;
    meeting: string;
    position: string;
    contact: string;
    period: string;
    content: string;
    registerNum: number;
  };
};

export type OriginalCommentType = {
  commentItem: {
    comment: string;
  };
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
  | ReturnType<typeof getForm>
  | ReturnType<typeof postClose>
  | ReturnType<typeof postDelete>
  | ReturnType<typeof changeComment>
  | ReturnType<typeof postComment>
  | ReturnType<typeof changeRecruit>
  | ReturnType<typeof unloadComment>
  | ReturnType<typeof getOriginalForm>
  | ReturnType<typeof modifyForm>
  | ReturnType<typeof getOriginalComment>;
