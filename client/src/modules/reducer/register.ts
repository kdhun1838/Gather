import { RegisterState, RegisterAction } from "../types/registerType";
import {CHANGE_FORM, POST_FORM} from "../actions/registerAction"
import { createReducer } from "typesafe-actions";


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
};

// 기존 리듀서
// const register = (
//   state: RegisterState = initialState,
//   action: RegisterAction
// ): RegisterState => {
//   switch (action.type) {
//     case CHANGE_FORM:
//       return {
//         ...state,
//         form: {
//           ...state.form,
//           [action.payload.key]: action.payload.value,
//         },
//       };
//     case POST_FORM:
//       return {
//         ...state,
//         form: {
//           ...state.form,
//         },
//       };
//     default:
//       return state;
//   }
// }


// typesafe-actions 리듀서
const register = createReducer<RegisterState, RegisterAction>(initialState, {
  [CHANGE_FORM]: (state, action) => ({
    ...state,
    form: {
      ...state.form,
      [action.payload.key]: action.payload.value,
    },
  }),
  [POST_FORM]: (state, action) => ({
      ...state,
      form: {
          ...state.form,
      }
  })
});


export default register;
