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
} from "./action";
import * as communityAPI from "../../lib/api/community";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "../../lib/function/createRequestSaga";

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

const addFavoriteCommunityPostsSaga = createRequestSaga(
  ADD_FAVORITE_POST,
  communityAPI.addFavoritePost
);

export function* CommunitySaga() {
  yield takeLatest(GET_COMMENTS, getCommentsSaga);
  yield takeLatest(GET_POSTS, getCommunityPostsSaga);
  yield takeLatest(SAVE_FORM, saveFormSaga);
  yield takeLatest(ADD_FAVORITE_POST, addFavoriteCommunityPostsSaga);
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_POPULAR_POSTS, getPopularPostsSaga);
  yield takeLatest(ADD_COMMENT, addCommentSaga);
  yield takeLatest(ADD_REPLY_COMMENT, addReplySaga);
  yield takeLatest(GET_REPLYS, getReplysSaga);
}
