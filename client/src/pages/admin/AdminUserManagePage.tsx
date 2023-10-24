import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminUserManageContainer from "../../container/admin/user/AdminUserManageContainer";

const AdminUserManagePage: React.FC = () => {
  return (
    <div>
      <AdminHeaderContainer />
      <AdminBody>
        <AdminUserManageContainer />
      </AdminBody>
    </div>
  );
};

export default AdminUserManagePage;
