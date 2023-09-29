import {
  changeForm,
  initForm,
  getPosts,
  saveForm,
  changeSortType,
} from "./action";

// 타입 정의

type FormType = {
  category: string;
  detail: string;
  title: string;
  content: string;
};

type DetailType = {
  sort?: string;
  category?: string;
  online?: string;
};

type SortType = {
  mainSort?: string;
  detailSort?: DetailType;
  search?: string;
};

export type CommunityState = {
  form: FormType;

  main: {
    popularPosts: any;
    sort: SortType;
    mainPosts: any;
  };
};

export type GetPostType = SortType;

export type CommunityAction =
  | ReturnType<typeof changeForm>
  | ReturnType<typeof changeSortType>
  | ReturnType<typeof initForm>
  | ReturnType<typeof saveForm>
  | ReturnType<typeof getPosts>;
