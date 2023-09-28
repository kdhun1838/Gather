import createRequestSaga from "../../utils/createRequestSaga";
import { GET_POSTS, SAVE_FORM } from "./action";
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

export function* CommunitySaga() {
  yield takeLatest(GET_POSTS, getCommunityPostsSaga);
  yield takeLatest(SAVE_FORM, saveFormSaga);
}
