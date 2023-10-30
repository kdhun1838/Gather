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
  getEditPost,
  editPost,
  deletePost,
} from "./action";

// 타입 정의

// 작성 양식 타입
export type FormType = {
  category: string;
  detail: string;
  title: string;
  content: string;
};

//디테일 정렬 타입
type DetailType = {
  time?: string;
  view?: string;
  like?: string;
};

//정렬 타입
export type SortType = {
  mainSort?: string;
  detailSort?: DetailType;
  search?: string;
};

// 댓글 타입
export type CommentType = {
  parents: any;
  child: any;
};

// 초기값 타입
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

export type CommunityAction =
  | ReturnType<typeof changeForm>
  | ReturnType<typeof changeSortType>
  | ReturnType<typeof changeDeailType>
  | ReturnType<typeof initForm>
  | ReturnType<typeof initDetail>
  | ReturnType<typeof initReply>

  // 포스트 관련
  | ReturnType<typeof saveForm>
  | ReturnType<typeof getPosts>
  | ReturnType<typeof getPost>

  // 포스트 댓글 관련
  | ReturnType<typeof addComment>
  | ReturnType<typeof getComments>
  | ReturnType<typeof getReplys>

  // 포스트 수정 관련
  | ReturnType<typeof getEditPost>
  | ReturnType<typeof editPost>

  // 포스트 삭제 관련
  | ReturnType<typeof deletePost>

  // 포스트 즐겨찾기 관련
  | ReturnType<typeof addFavorite>;
