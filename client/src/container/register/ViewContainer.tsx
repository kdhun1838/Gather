import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import View from "../../components/register/View";
import { RootState } from "../../modules";
import { getForm, postClose, postDelete } from "../../modules/register/action";

const ViewContainer = () => {
  const formData = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId || "";
  const navigator = useNavigate();

  const onClose = useCallback((postId:Number) => {
    dispatch(postClose(postId));
    alert("마감되었습니다.");
    navigator("/")
  }, [dispatch, postId]);

  const onDelete = useCallback((postId:Number) => {
    dispatch(postDelete(postId));
    alert("삭제되었습니다.");
    navigator("/")
  }, [dispatch, postId]);

  React.useEffect(() => {
    dispatch(getForm(Number(postId)));
  }, [dispatch, postId]);

  return (
    <div>
      <View formData={formData} onClose={onClose} onDelete={onDelete} postId={Number(postId)}/>
    </div>
  );
};

export default ViewContainer;
