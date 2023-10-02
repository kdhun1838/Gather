import createRequestSaga from "../../utils/createRequestSaga";
import { ADD_FAVORITE_POST, GET_POST, GET_POSTS, SAVE_FORM } from "./action";
import * as communityAPI from "../../lib/api/community";
import { takeLatest } from "redux-saga/effects";

const saveFormSaga = createRequestSaga(
  SAVE_FORM,
  communityAPI.createCommunityPost
);

const getCommunityPostsSaga = createRequestSaga(
  GET_POSTS,
  communityAPI.getCommunityPosts
);

const getPostSaga = createRequestSaga(GET_POST, communityAPI.getPost);

const addFavoriteCommunityPostsSaga = createRequestSaga(
  ADD_FAVORITE_POST,
  communityAPI.addFavoritePost
);

export function* CommunitySaga() {
  yield takeLatest(GET_POSTS, getCommunityPostsSaga);
  yield takeLatest(SAVE_FORM, saveFormSaga);
  yield takeLatest(ADD_FAVORITE_POST, addFavoriteCommunityPostsSaga);
  yield takeLatest(GET_POST, getPostSaga);
}
