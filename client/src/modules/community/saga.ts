import {
  ADD_COMMENT,
  ADD_FAVORITE_POST,
  GET_POPULAR_POSTS,
  GET_POST,
  GET_POSTS,
  SAVE_FORM,
  ADD_REPLY_COMMENT,
  GET_COMMENTS,
  GET_REPLYS,
  GET_EDIT_POST,
  EDIT_POST,
  DELETE_POST,
} from "./action";
import * as communityAPI from "../../lib/api/community";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "../../lib/function/createRequestSaga";

// 포스트 관련 사가
const saveFormSaga = createRequestSaga(
  SAVE_FORM,
  communityAPI.createCommunityPost
);

const getCommunityPostsSaga = createRequestSaga(
  GET_POSTS,
  communityAPI.getCommunityPosts
);

const getPopularPostsSaga = createRequestSaga(
  GET_POPULAR_POSTS,
  communityAPI.getPopularPosts
);

const getPostSaga = createRequestSaga(GET_POST, communityAPI.getPost);

// 포스트 수정 관련
const getEditPostSaga = createRequestSaga(
  GET_EDIT_POST,
  communityAPI.getEditPost
);

const editPostSaga = createRequestSaga(EDIT_POST, communityAPI.editPost);

// 포스트 삭제 관련
const deletePostSaga = createRequestSaga(DELETE_POST, communityAPI.deletePost);

// 포스트 댓글 관련
const getCommentsSaga = createRequestSaga(
  GET_COMMENTS,
  communityAPI.getComments
);
const getReplysSaga = createRequestSaga(GET_REPLYS, communityAPI.getReplys);

const addCommentSaga = createRequestSaga(ADD_COMMENT, communityAPI.addComment);
const addReplySaga = createRequestSaga(
  ADD_REPLY_COMMENT,
  communityAPI.addReply
);

//즐겨찾기 관련
const addFavoriteCommunityPostsSaga = createRequestSaga(
  ADD_FAVORITE_POST,
  communityAPI.addFavoritePost
);

export function* CommunitySaga() {
  // 포스트
  yield takeLatest(GET_POSTS, getCommunityPostsSaga);
  yield takeLatest(SAVE_FORM, saveFormSaga);
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_POPULAR_POSTS, getPopularPostsSaga);

  // 댓글
  yield takeLatest(GET_COMMENTS, getCommentsSaga);
  yield takeLatest(ADD_COMMENT, addCommentSaga);
  yield takeLatest(ADD_REPLY_COMMENT, addReplySaga);
  yield takeLatest(GET_REPLYS, getReplysSaga);

  // 수정
  yield takeLatest(GET_EDIT_POST, getEditPostSaga);
  yield takeLatest(EDIT_POST, editPostSaga);

  // 삭제
  yield takeLatest(DELETE_POST, deletePostSaga);

  //즐겨찾기
  yield takeLatest(ADD_FAVORITE_POST, addFavoriteCommunityPostsSaga);
}
