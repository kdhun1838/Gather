import React from "react";
import AdminRegisterModal from "../../../components/admin/register/AdminRegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { useNavigate, useParams } from "react-router-dom";
import {
  getForm,
  getOriginalForm,
  postClose,
  postDelete,
} from "../../../modules/register/action";
import View from "../../../components/register/View";

interface OwnProps {
  postId: number;
  handleCancel: () => void;
  getData: () => void;
}

const AdminRegisterModalContainer: React.FC<OwnProps> = ({
  postId,
  handleCancel,
  getData,
}) => {
  console.log("postId===", postId);
  const { formData, user } = useSelector((state: RootState) => ({
    formData: state.register.formData,
    user: state.user.user,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClose = React.useCallback(
    (postId: Number) => {
      dispatch(postClose(postId));
      alert("마감되었습니다.");
      handleCancel();
      getData();
    },
    [dispatch]
  );

  const onDelete = React.useCallback(
    (postId: Number) => {
      dispatch(postDelete(postId));
      alert("삭제되었습니다.");
      handleCancel();
      getData();
    },
    [dispatch]
  );

  const onGetOriginalForm = () => {
    const originFormData = formData.getFormData;

    dispatch(getOriginalForm(originFormData));
    navigate("/admin/register/manage");
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
        isAdmin={true}
      />
    </div>
  );
};

export default AdminRegisterModalContainer;
