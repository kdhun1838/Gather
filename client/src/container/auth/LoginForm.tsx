import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { changeField, initializeForm } from '../../modules/auth/action';
import AuthForm from '../../components/auth/AuthForm';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { form } = useSelector((state: RootState) => ({
    form: state.auth.login,
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
    // 이 부분에서 로그인 처리를 수행할 수 있습니다.
  };

  useEffect(() => {
    dispatch(initializeForm(form));
  }, [dispatch]);

  return <AuthForm type="login" onChange={onChange} onSubmit={onSubmit} />;
};

export default LoginForm;
