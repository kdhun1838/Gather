import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminRegisterManageContainer from "../../container/admin/register/AdminRegisterManageContainer";

const AdminRegisterManagePage: React.FC = () => {
  return (
    <div>
      <AdminHeaderContainer />
      <AdminBody>
        <AdminRegisterManageContainer />
      </AdminBody>
    </div>
  );
};

export default AdminRegisterManagePage;
