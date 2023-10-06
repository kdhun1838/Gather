import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { changeField, initializeForm } from '../../modules/auth/action';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { form } = useSelector((state: RootState) => ({
    form: state.auth.register,
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
  };

  useEffect(() => {
    dispatch(initializeForm(form));
  }, [dispatch]);

  return <AuthForm type="register" onChange={onChange} onSubmit={onSubmit} />;
};

export default RegisterForm;
