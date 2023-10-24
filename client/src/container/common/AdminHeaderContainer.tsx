import React from "react";
import AdminHeader from "../../components/common/admin/AdminHeader";
import { RootState } from "../../modules";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../modules/user/action";
import { useNavigate } from "react-router-dom";

const AdminHeaderContainer: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
    dispatch(logout(user));
  };
  return (
    <div>
      <AdminHeader user={user.user} onLogout={onLogout} />
    </div>
  );
};

export default AdminHeaderContainer;
