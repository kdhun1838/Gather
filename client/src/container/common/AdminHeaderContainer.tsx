import React from "react";
import AdminHeader from "../../components/common/admin/AdminHeader";
import { RootState } from "../../modules";
import { useSelector } from "react-redux";

const AdminHeaderContainer: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));
  const onLogout = () => {
    console.log("onLogout");
  };
  return (
    <div>
      <AdminHeader user={user.user} onLogout={onLogout} />
    </div>
  );
};

export default AdminHeaderContainer;
