import { all } from "axios";
import { combineReducers } from "redux";
import { registerSaga } from "../sagas/registerSaga";
import register from "./register";

const rootReducer = combineReducers({
    register
});

export default rootReducer;
export * from '../sagas/registerSaga';

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(){
    yield all([registerSaga()]);
}