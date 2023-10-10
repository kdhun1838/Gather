import { RegisterState, RegisterAction } from "./type";
import {
  CHANGE_DETAIL_SORT_FORM,
  CHANGE_FORM,
  CHANGE_SORT_FORM,
  GET_LIST,
  POST_FORM,
  UNLOAD_FORM,
} from "./action";

const initialState: RegisterState = {
  form: {
    title: "",
    category: "",
    personnel: 0,
    online: "",
    position: "",
    contact: "",
    content: "",
  },
  list: {
    popularList: null,
    sort: {
      mainSort: "전체",
      detailSort: {
        time: "newest",
        view: "",
        like: "",
      },
      search: "",
    },
    mainList: null,
  },
  register: null,
};

const register = (
  state: RegisterState = initialState,
  action: RegisterAction
): RegisterState => {
  switch (action.type) {
    case UNLOAD_FORM:
      return initialState;
    case CHANGE_FORM:
      if ("key" in action.payload && "value" in action.payload) {
        return {
          ...state,
          form: {
            ...state.form,
            [action.payload.key]: action.payload.value,
          },
        };
      }
      return state;
    case CHANGE_SORT_FORM:
      if ("key" in action.payload && "value" in action.payload) {
        return {
          ...state,
          list: {
            ...state.list,
            sort: {
              ...state.list.sort,
              [action.payload.key]: action.payload.value,
            },
          },
        };
      }
      return state;
    case CHANGE_DETAIL_SORT_FORM:
      if ("key" in action.payload && "value" in action.payload) {
        return {
          ...state,
          list: {
            ...state.list,
            sort: {
              ...state.list.sort,
              detailSort: {
                ...state.list.sort.detailSort,
                [action.payload.key]: action.payload.value,
              },
            },
          },
        };
      }
      return state;
    case `${POST_FORM}_SUCCESS`:
      return {
        ...state,
        register: action.payload,
      };
    case `${POST_FORM}_FAILURE`:
      return state;
    case `${GET_LIST}_SUCCESS`:
      console.log("getlist성공 리듀서", action.payload);
      return {
        ...state,
        list: {
          ...state.list,
          mainList: action.payload,
        },
      };
    case `${GET_LIST}_FAILURE`:
      console.log("getlist실패 리듀서", action.payload);
      return {
        ...state,
        list: {
          ...state.list,
          mainList: null,
        },
      };

    default:
      return state;
  }
};

export default register;
