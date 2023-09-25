import React, { ChangeEvent } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Register from "../components/Register";
import { RootState } from "../modules";
import { RegisterState } from "../modules/register/type";
import { changeForm, postForm, unloadForm } from "./../modules/register/action";
import { useNavigate } from "react-router";

const RegisterContainer = () => {
  const form = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeForm = useCallback(
    (data: { key: string; value: string | number }) => {
      dispatch(changeForm({ key: data.key, value: String(data.value) }));
    },
    [dispatch]
  );
  const onPostForm = useCallback(
    (form: RegisterState) => {
      dispatch(postForm(form));
      console.log("form===", form);
      navigate("/");
    },
    [dispatch]
  );
  React.useEffect(() => {
    console.log("formmmmmmmmmmmmmmmmmm", form);
    return () => {
      dispatch(unloadForm());
    };
  }, [dispatch]);

  return (
    <div>
      <Register
        onChangeForm={onChangeForm}
        onPostForm={onPostForm}
        form={form}
      />
    </div>
  );
};

export default RegisterContainer;
