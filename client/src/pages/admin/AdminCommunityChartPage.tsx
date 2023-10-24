import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminCommunityChartContainer from "../../container/admin/community/AdminCommunityChartContainer";

const AdminCommunityChartPage: React.FC = () => {
  return (
    <div>
      <AdminHeaderContainer />
      <AdminBody>
        <AdminCommunityChartContainer />
      </AdminBody>
    </div>
  );
};

export default AdminCommunityChartPage;
