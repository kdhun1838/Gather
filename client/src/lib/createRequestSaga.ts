import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios"; // AxiosResponse를 사용하여 API 응답의 타입을 지정합니다.
import { finishLoading, startLoading } from "../modules/loading";

// 액션 타입을 생성하는 함수
export const createRequestActionTypes = (type: string) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

// request 함수와 함께 사용할 타입을 정의합니다.
type RequestFunction = (payload: any) => Promise<AxiosResponse<any>>;

export default function createRequestSaga(
  type: string,
  request: RequestFunction
) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action: { type: string; payload: any }) {
    yield put(startLoading(type));
    try {
      const response: AxiosResponse<any> = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
