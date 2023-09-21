import { combineReducers } from "redux";
import register from "./register";
import { registerSaga } from "../actions/registerAction";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  register,
});

export function* rootSaga() {
  yield all([registerSaga()]);
}
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
