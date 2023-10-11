import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { changeField, initializeForm, signup } from '../../modules/auth/action';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user/action';

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector((state: RootState) => ({
    form: state.auth.register,
    auth: state.auth.auth,
    authError: state.auth.authError,
    user: state.user.user,
  }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        name: 'register',
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      id,
      password,
      passwordConfirm,
      name,
      nick,
      email,
      tel,
      age,
      grade,
      job,
      career,
      skill,
    } = form;

    if (
      [
        id,
        password,
        passwordConfirm,
        name,
        nick,
        email,
        tel,
        age,
        grade,
        job,
        career,
        skill,
      ].includes('')
    ) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }

    if (password !== passwordConfirm) {
      console.log('dfjksldfjklsdfj');
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ name: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ name: 'register', key: 'passwordConfirm', value: '' })
      );
      return;
    }
    dispatch(
      signup({
        id,
        password,
        passwordConfirm,
        name,
        nick,
        email,
        tel,
        age,
        grade,
        job,
        career,
        skill,
      })
    );
  };

  useEffect(() => {
    dispatch(initializeForm(form));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      setError('회원가입 실패');
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check(user));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      console.log('check API 성공');
      console.log(user);
    }
  }, [user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
