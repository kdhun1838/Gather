import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import View from "../../components/register/View";
import { RootState } from "../../modules";
import {
  getForm,
  postClose,
  postDelete,
} from "../../modules/register/action";

const ViewContainer = () => {
  const { formData } = useSelector((state: RootState) => state.register);
  console.log("formData1111", formData);
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

  React.useEffect(() => {
    dispatch(getForm(postId));
  }, [dispatch, postId]);

  React.useEffect(() => {
    console.log("formData22222222", formData)
  })
  return (
    <div>
      <View
        formData={formData}
        onClose={onClose}
        onDelete={onDelete}
        postId={postId}
      />
    </div>
  );
};

export default ViewContainer;
