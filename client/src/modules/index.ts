import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import register from './register/reducer';
import { registerSaga } from './register/saga';
import community from './community/reducer';
import { CommunitySaga } from './community/saga';
import auth from './auth/reducer';
import { authSaga } from './auth/saga';
import user from './user/reducer';
import { userSaga } from './user/saga';
import loading from './loading';

const rootReducer = combineReducers({
  loading,
  register,
  community,
  auth,
  user,
});

export function* rootSaga() {
  yield all([registerSaga(), CommunitySaga(), authSaga(), userSaga()]);
}
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
