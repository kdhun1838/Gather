import React, { ChangeEvent } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeForm, postForm } from "../actions/registerAction";
import Register from "../components/Register";
import { RootState } from "../modules";
import { RegisterState } from "../types/registerType";

const RegisterContainer = () => {
  const form = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();

  const onChangeForm = useCallback(
    (data: { key: string; value: string | number }) => {
      dispatch(changeForm({ key: data.key, value: String(data.value) }));
    },
    [dispatch]
  );
  const onPostForm = useCallback((form: RegisterState) => {
    dispatch(postForm(form));
    console.log(form);
  }, [dispatch])

  return (
    <div>
      <Register onChangeForm={onChangeForm} onPostForm={onPostForm} form={form}/>
    </div>
  );
};

export default RegisterContainer;
