import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminUserChartContainer from "../../container/admin/user/AdminUserChartContainer";

const AdminUserChartPage: React.FC = () => {
  return (
    <div>
      <AdminHeaderContainer />
      <AdminBody>
        <AdminUserChartContainer />
      </AdminBody>
    </div>
  );
};

export default AdminUserChartPage;
