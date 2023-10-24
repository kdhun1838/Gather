import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminRegisterChartContainer from "../../container/admin/register/AdminRegisterChartContainer";

const AdminRegisterChartPage: React.FC = () => {
  return (
    <div>
      <AdminHeaderContainer />
      <AdminBody>
        <AdminRegisterChartContainer />
      </AdminBody>
    </div>
  );
};

export default AdminRegisterChartPage;
