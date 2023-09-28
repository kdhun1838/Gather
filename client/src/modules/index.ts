import { combineReducers } from "redux";

import { all } from "redux-saga/effects";
import register from "./register/reducer";
import { registerSaga } from "./register/saga";
import community from "./community/reducer";
import { CommunitySaga } from "./community/saga";

const rootReducer = combineReducers({
  register,
  community,
});

export function* rootSaga() {
  yield all([registerSaga(), CommunitySaga()]);
}
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
