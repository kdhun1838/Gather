import { CommunityState, CommunityAction } from "./type";
import { CHANGE_FORM, INIT_FORM } from "./action";

const initialState: CommunityState = {
  form: {
    category: "선택사항",
    detail: "",
    title: "",
    content: "",
  },
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
    // case `${POST_FORM}_SUCCESS`:
    //   console.log("ssss", action.payload);
    //   return {
    //     ...state,
    //     register: action.payload,
    //   };
    // case `${POST_FORM}_FAILURE`:
    //   console.log("실패");
    //   return state;
    default:
      return state;
  }
};

export default community;
