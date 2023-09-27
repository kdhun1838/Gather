// 액션 정의 (마지막에 as const 붙이기)
export const CHANGE_FORM = "community/CHANGE_FORM" as const;
export const INIT_FORM = "community/INIT_FORM" as const;

// 액션 생성 (매개 변수에 타입 넣어주기)
export const initForm = () => ({
  type: INIT_FORM,
  payload: {},
});

export const changeForm = ({ key, value }: { key: string; value: string }) => ({
  type: CHANGE_FORM,
  payload: {
    key,
    value,
  },
});
