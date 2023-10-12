import { RegisterState, RegisterAction } from "./type";
import {
  CHANGE_FORM,
  GET_FORM,
  POST_CLOSE,
  POST_DELETE,
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
    period: "",
    content: "",
  },
  formData: {},
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
    case `${POST_FORM}_SUCCESS`:
      return {
        ...state,
        form: {
          ...state.form,
        },
      };
    case `${POST_FORM}_FAILURE`:
      return state;
    case `${GET_FORM}_SUCCESS`:
      return {
        ...state,
        formData: action.payload,
      };
    case `${GET_FORM}_FAILURE`:
      return state;
    case `${POST_CLOSE}_SUCCESS`:
      return {
        ...state,
      };
    case `${POST_CLOSE}_FAILURE`:
      return state;
    case `${POST_DELETE}_SUCCESS`:
      return {
        ...state,
      };
    case `${POST_DELETE}_FAILURE`:
      return state;
    default:
      return state;
  }
};

export default register;
