import {
  changeForm,
  initForm,
  getPosts,
  saveForm,
  changeSortType,
  changeDeailType,
  initDetail,
  addFavorite,
  getPost,
  addComment,
  getComments,
  getReplys,
  initReply,
} from "./action";

// 타입 정의

type FormType = {
  category: string;
  detail: string;
  title: string;
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

export type CommentType = {
  parents: any;
  child: any;
};

export type CommunityState = {
  [key: string]: any;
  form: FormType;

  main: {
    popularPosts: any;
    sort: SortType;
    mainPosts: any;
  };

  post: {
    getPost: any;
    getComments: any;
    getReply: any;
    comment: string;
    reply: string;
    nestedReply: string;
  };
};

export type GetPostType = SortType;

export type CommunityTypeWithUser = {
  communityNum: number;
  id: string;
  nick: string;
  name: string;
  userNum: number;
  title: string;
  category: string;
  content: string;
  detail: string;
  view: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CommunityAction =
  | ReturnType<typeof changeForm>
  | ReturnType<typeof changeSortType>
  | ReturnType<typeof changeDeailType>
  | ReturnType<typeof initForm>
  | ReturnType<typeof initDetail>
  | ReturnType<typeof initReply>
  | ReturnType<typeof saveForm>
  | ReturnType<typeof getPosts>
  | ReturnType<typeof getPost>
  | ReturnType<typeof addFavorite>
  | ReturnType<typeof addComment>
  | ReturnType<typeof getComments>
  | ReturnType<typeof getReplys>;
