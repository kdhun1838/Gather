import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import View from "../../components/register/View";
import { RootState } from "../../modules";
import {
  getForm,
  getOriginalForm,
  postClose,
  postDelete,
} from "../../modules/register/action";

const ViewContainer = () => {
  const { formData, user } = useSelector((state: RootState) => ({
    formData: state.register.formData,
    user: state.user.user,
  }));
  const dispatch = useDispatch();
  const params = useParams();
  const postId = Number(params.postId);
  const navigate = useNavigate();

  const onClose = useCallback(
    (postId: Number) => {
      dispatch(postClose(postId));
      alert("마감되었습니다.");
      navigate("/");
    },
    [dispatch, navigate]
  );

  const onDelete = useCallback(
    (postId: Number) => {
      dispatch(postDelete(postId));
      alert("삭제되었습니다.");
      navigate("/");
    },
    [dispatch, navigate]
  );

  const onGetOriginalForm = () => {
    const originFormData = formData.getFormData;

    dispatch(getOriginalForm(postId, originFormData));
    navigate("/register");
  };

  React.useEffect(() => {
    dispatch(getForm(postId));
  }, [dispatch, postId]);

  return (
    <div>
      <View
        formData={formData}
        onClose={onClose}
        onDelete={onDelete}
        onGetOriginalForm={onGetOriginalForm}
        postId={postId}
        user={user}
      />
    </div>
  );
};

export default ViewContainer;
