import { CommunityState, CommunityAction } from "./type";
import { CHANGE_FORM, GET_POSTS, INIT_FORM, SAVE_FORM } from "./action";

const initialState: CommunityState = {
  form: {
    category: "선택사항",
    detail: "",
    title: "",
    content: "",
  },
  posts: null,
};

const community = (
  state: CommunityState = initialState,
  action: CommunityAction
): CommunityState => {
  switch (action.type) {
    case INIT_FORM:
      return initialState;
    case CHANGE_FORM:
      // action.payload 객체 안에 key와 value 둘 다 존재할 경우
      if ("key" in action.payload && "value" in action.payload) {
        return {
          //불변성
          ...state,
          form: {
            ...state.form,
            [action.payload.key]: action.payload.value,
          },
        };
      }
      return state;

    // 게시물 저장하기
    case `${SAVE_FORM}_SUCCESS`:
      console.log("저장성공", action.payload);
      return {
        ...state,
      };
    case `${SAVE_FORM}_FAILURE`:
      console.log("저장실패", action.payload);
      return {
        ...state,
      };

    // 게시물 불러오기
    case `${GET_POSTS}_SUCCESS`:
      console.log("불러오기 성공", action.payload);
      return {
        ...state,
        posts: action.payload,
      };
    case `${GET_POSTS}_FAILURE`:
      console.log("불러오기 실패", action.payload);
      return {
        ...state,
        posts: null,
      };
    default:
      return state;
  }
};

export default community;
