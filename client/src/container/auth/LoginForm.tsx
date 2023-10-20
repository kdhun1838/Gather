import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { changeField, initializeForm, login } from "../../modules/auth/action";
import AuthForm from "../../components/auth/AuthForm";
import { check, tempSetUser } from "../../modules/user/action";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector((state: RootState) => ({
    form: state.auth.login,
    auth: state.auth.auth,
    authError: state.auth.authError,
    user: state.user.user,
  }));

  const onChange = (data: { key: string; value: string | number }) => {
    dispatch(
      changeField({
        name: "login",
        key: data.key,
        value: String(data.value),
      })
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const logininfo = form;
    console.log("ddddddddddd", logininfo);
    dispatch(login(form));
    // 이 부분에서 로그인 처리를 수행할 수 있습니다.
  };

  useEffect(() => {
    dispatch(initializeForm(form));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("오류 발생");
      console.log(authError);
      setError("로그인 실패");
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      dispatch(check(user));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/");
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [navigate, user]);

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
