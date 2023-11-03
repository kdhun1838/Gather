import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Register from "../../../components/register/Register";
import { RootState } from "../../../modules";
import { RegisterState } from "../../../modules/register/type";
import {
  changeForm,
  getOriginalForm,
  modifyForm,
  postForm,
  unloadForm,
} from "../../../modules/register/action";
import { useNavigate } from "react-router";

const AdminRegisterManageUpdateContainer = () => {
  const [isPost, setIsPost] = useState(false);

  const { form, userNum } = useSelector((state: RootState) => ({
    form: state.register,
    userNum: state.user,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeForm = React.useCallback(
    (data: { key: string; value: string | number }) => {
      dispatch(changeForm({ key: data.key, value: String(data.value) }));
    },
    [dispatch]
  );

  const onIsPost = (e: FormEvent) => {
    if (
      form.form.title === "" ||
      form.form.category === "" ||
      form.form.personnel === 0 ||
      form.form.online === "" ||
      form.form.position === "" ||
      form.form.contact === "" ||
      form.form.content === ""
    ) {
      e.preventDefault();
      alert("내용을 입력하세요.");
    } else {
      setIsPost(true);
    }
  };

  const onPageBack = () => {
    navigate(-1);
  };

  const onCancle = () => {
    setIsPost(false);
  };

  const onPostForm = React.useCallback(
    (form: RegisterState, userNum: number) => {
      dispatch(postForm(form, userNum));
      setIsPost(false);
      navigate("/admin/register/manage");
    },
    [dispatch, form]
  );

  const onModifyForm = React.useCallback(
    (form: RegisterState, postId: number) => {
      dispatch(modifyForm(form, postId));
      console.log("what PostId ?????", postId);
      setIsPost(false);
      navigate("/admin/register/manage");
    },
    [dispatch, form]
  );

  React.useEffect(() => {
    return () => {
      dispatch(unloadForm());
    };
  }, [dispatch]);

  return (
    <div>
      <Register
        onChangeForm={onChangeForm}
        onPostForm={onPostForm}
        onPageBack={onPageBack}
        onIsPost={onIsPost}
        onCancle={onCancle}
        onModifyForm={onModifyForm}
        isPost={isPost}
        form={form}
        userNum={userNum.user?.userNum}
        originalPostId={form.form.originalPostId}
        isAdmin={true}
      />
    </div>
  );
};

export default AdminRegisterManageUpdateContainer;
