import { RegisterState, RegisterAction } from "../types/registerType";
import { CHANGE_FORM, POST_FORM, UNLOAD_FORM } from "../actions/registerAction";

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
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.key]: action.payload.value,
        },
      };
    case `${POST_FORM}_SUCCESS`:
      console.log("ssss", action.payload);
      return {
        ...state,
        register: action.payload,
      };
    case `${POST_FORM}_FAILURE`:
      console.log("실패");
      return state;
    default:
      return state;
  }
};

export default register;
