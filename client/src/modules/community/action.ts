import { createRequestActionTypes } from "../../utils/createRequestSaga";
import { CommunityState, GetPostType } from "./type";

// 액션 정의 (마지막에 as const 붙이기)
export const CHANGE_FORM = "community/CHANGE_FORM" as const;
export const CHANGE_SORT = "community/CHANGE_SORT_TYPE" as const;
export const INIT_FORM = "community/INIT_FORM" as const;

export const [SAVE_FORM, SAVE_FORM_SUCCESS, SAVE_FORM_FAILURE] =
  createRequestActionTypes("community/SAVE_FORM");

export const [GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAILURE] =
  createRequestActionTypes("community/GET_POSTS");

// 액션 생성 (매개 변수에 타입 넣어주기)
export const initForm = () => ({
  type: INIT_FORM,
  payload: {},
});

export const changeForm = ({ key, value }: { key: string; value: string }) => ({
  type: CHANGE_FORM,
  payload: {
    key,
    value,
  },
});

export const changeSortType = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => ({
  type: CHANGE_SORT,
  payload: {
    key,
    value,
  },
});

export const saveForm = (form: CommunityState) => ({
  type: SAVE_FORM,
  payload: {
    form,
  },
});

export const getPosts = (data: GetPostType) => ({
  type: GET_POSTS,
  payload: {
    data,
  },
});
