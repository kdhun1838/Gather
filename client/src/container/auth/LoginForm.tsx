import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { changeField, initializeForm, login } from '../../modules/auth/action';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user/action';
import { createGlobalStyle } from 'styled-components';

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector((state: RootState) => ({
    form: state.auth,
    auth: state.auth.auth,
    authError: state.auth.authError,
    user: state.user.user,
  }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        name: 'login',
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('ddddddddddd', form);
    dispatch(login(form));
    // 이 부분에서 로그인 처리를 수행할 수 있습니다.
  };
  const initlogin = form.login;
  useEffect(() => {
    dispatch(initializeForm(initlogin));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      dispatch(check(user));
    }
  }, [auth, authError, dispatch]);

  return (
    <AuthForm
      type="login"
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      form={form}
    />
  );
};

export default LoginForm;
