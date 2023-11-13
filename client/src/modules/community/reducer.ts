import { CommunityState, CommunityAction, FormType } from './type';
import {
  CHANGE_FORM,
  CHANGE_SORT,
  CHANGE_DETAIL_SORT,
  GET_POSTS,
  INIT_FORM,
  SAVE_FORM,
  INIT_DETAIL_SORT,
  ADD_FAVORITE_POST,
  GET_POST,
  GET_POPULAR_POSTS,
  ADD_COMMENT,
  INIT_POST_FORM,
  ADD_REPLY_COMMENT,
  GET_COMMENTS,
  GET_REPLYS,
  GET_EDIT_POST,
  EDIT_POST,
  DELETE_POST,
} from './action';

const initialState: CommunityState = {
  form: {
    category: '선택사항',
    detail: '',
    title: '',
    content: '',
  },
  main: {
    popularPosts: null,
    sort: {
      mainSort: '전체',
      detailSort: {
        time: 'newest',
        view: '',
        like: '',
      },
      search: '',
    },
    mainPosts: null,
  },

  post: {
    getPost: '',
    getComments: '',
    getReply: '',
    comment: '',
    reply: '',
    nestedReply: '',
  },
};

const community = (
  state: CommunityState = initialState,
  action: CommunityAction
): CommunityState => {
  switch (action.type) {
    //초기화
    case INIT_FORM:
      return initialState;
    //입력값 변경

    case INIT_DETAIL_SORT:
      return {
        ...state,
        main: {
          ...state.main,
          sort: {
            ...state.main.sort,
            detailSort: {
              time: '',
              view: '',
              like: '',
            },
          },
        },
      };

    case INIT_POST_FORM:
      if ('postInitName' in action.payload) {
        const { postInitName } = action.payload;
        return {
          ...state,
          post: {
            ...state.post,
            [postInitName]: '',
          },
        };
      }
      return state;

    case CHANGE_FORM:
      // action.payload 객체 안에 name, key, value가 모두 존재할 경우
      if (
        'name' in action.payload &&
        'key' in action.payload &&
        'value' in action.payload
      ) {
        const { name, key, value } = action.payload;

        return {
          ...state,
          [name]: {
            ...state[name],
            [key]: value,
          },
        };
      }
      return state;

    // 정렬 버튼클릭
    case CHANGE_SORT:
      if ('key' in action.payload && 'value' in action.payload) {
        return {
          ...state,
          main: {
            ...state.main,
            sort: {
              ...state.main.sort,
              [action.payload.key]: action.payload.value,
            },
          },
        };
      }
      return state;

    case CHANGE_DETAIL_SORT:
      if ('key' in action.payload && 'value' in action.payload) {
        return {
          ...state,
          main: {
            ...state.main,
            sort: {
              ...state.main.sort,
              detailSort: {
                ...state.main.sort.detailSort,
                [action.payload.key]: action.payload.value,
              },
            },
          },
        };
      }
      return state;

    // 게시물 저장하기
    case `${SAVE_FORM}_SUCCESS`:
      return {
        ...state,
      };
    case `${SAVE_FORM}_FAILURE`:
      return {
        ...state,
      };

    // 게시물 불러오기
    case `${GET_POSTS}_SUCCESS`:
      const mainPosts = action.payload;
      return {
        ...state,
        main: {
          ...state.main,
          mainPosts,
        },
      };
    case `${GET_POSTS}_FAILURE`:
      return {
        ...state,
        main: {
          ...state.main,
          mainPosts: null,
        },
      };

    // 포스트 수정 관련
    case `${GET_EDIT_POST}_SUCCESS`:
      const form = action.payload as FormType;
      return {
        ...state,
        form,
      };
    case `${GET_EDIT_POST}_FAILURE`:
      return {
        ...state,
      };

    case `${EDIT_POST}_SUCCESS`:
      return {
        ...state,
        post: {
          ...state.post,
          getPost: action.payload,
        },
      };

    case `${EDIT_POST}_FAILURE`:
      return {
        ...state,
        post: {
          ...state.post,
          getPost: '',
        },
      };

    // 포스트 삭제 관련
    case `${DELETE_POST}_SUCCESS`:
      return {
        ...state,
      };

    case `${DELETE_POST}_FAILURE`:
      return {
        ...state,
      };

    // 인기 게시물 불러오기
    case `${GET_POPULAR_POSTS}_SUCCESS`:
      return {
        ...state,
        main: {
          ...state.main,
          popularPosts: action.payload,
        },
      };
    case `${GET_POPULAR_POSTS}_FAILURE`:
      return {
        ...state,
        main: {
          ...state.main,
          popularPosts: '',
        },
      };

    // 즐겨찾기 추가 및 제거
    case `${ADD_FAVORITE_POST}_SUCCESS`:
      return {
        ...state,
      };
    case `${ADD_FAVORITE_POST}_FAILURE`:
      return {
        ...state,
      };

    //Post 불러오기
    case `${GET_POST}_SUCCESS`:
      const getPost = action.payload;
      return {
        ...state,
        post: {
          ...state.post,
          getPost,
        },
      };
    case `${GET_POST}_FAILURE`:
      return {
        ...state,
        post: {
          ...state.post,
          getPost: '',
        },
      };

    case `${GET_COMMENTS}_SUCCESS`:
      const getComments = action.payload;
      return {
        ...state,
        post: {
          ...state.post,
          getComments,
        },
      };

    case `${GET_COMMENTS}_FAILURE`:
      return {
        ...state,
        post: {
          ...state.post,
          getComments: '',
        },
      };

    case `${GET_REPLYS}_SUCCESS`:
      const getReply = action.payload;
      return {
        ...state,
        post: {
          ...state.post,
          getReply,
        },
      };

    case `${GET_REPLYS}_FAILURE`:
      return {
        ...state,
        post: {
          ...state.post,
          getReply: '',
        },
      };

    case `${ADD_COMMENT}_SUCCESS`:
      return {
        ...state,
        post: {
          ...state.post,
          getComments: action.payload,
        },
      };
    case `${ADD_COMMENT}_FAILURE`:
      return {
        ...state,
      };

    case `${ADD_REPLY_COMMENT}_SUCCESS`:
      return {
        ...state,
        post: {
          ...state.post,
          getReply: action.payload,
        },
      };
    case `${ADD_REPLY_COMMENT}_FAILURE`:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default community;
