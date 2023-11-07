import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminRegisterChartContainer from "../../container/admin/register/AdminRegisterChartContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

const AdminRegisterChartPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));

  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <AdminRegisterChartContainer />
          </AdminBody>
        </>
      ) : (
        <>
          <AdminHeaderContainer />
        </>
      )}
    </div>
  );
};

export default AdminRegisterChartPage;
