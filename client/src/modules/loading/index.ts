import { createAction, ActionType, createReducer } from "typesafe-actions";

// 액션 타입 정의
const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

// 액션 생성 함수 정의
export const startLoading = createAction(START_LOADING)<string>();
export const finishLoading = createAction(FINISH_LOADING)<string>();

// 액션 객체 타입 정의
type LoadingAction = ActionType<typeof startLoading | typeof finishLoading>;

// 상태 초기화
interface LoadingState {
  [key: string]: boolean;
}

const initialState: LoadingState = {};

// 리듀서 정의
const loading = createReducer<LoadingState, LoadingAction>(initialState, {
  [START_LOADING]: (state, action) => ({
    ...state,
    [action.payload]: true,
  }),
  [FINISH_LOADING]: (state, action) => ({
    ...state,
    [action.payload]: false,
  }),
});

export default loading;
