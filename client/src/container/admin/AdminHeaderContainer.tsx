import React from "react";
import AdminHeader from "../../components/common/admin/AdminHeader";

const AdminHeaderContainer: React.FC = () => {
  const user = {
    name: "이름",
  };
  const onLogout = () => {
    console.log("onLogout");
  };
  return (
    <div>
      <AdminHeader user={user} onLogout={onLogout} />
    </div>
  );
};

export default AdminHeaderContainer;
