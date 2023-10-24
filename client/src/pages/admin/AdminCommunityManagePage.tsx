import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminCommunityManageContainer from "../../container/admin/community/AdminCommunityManageContainer";

const AdminCommunityManagePage: React.FC = () => {
  return (
    <div>
      <AdminHeaderContainer />
      <AdminBody>
        <AdminCommunityManageContainer />
      </AdminBody>
    </div>
  );
};

export default AdminCommunityManagePage;
