import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminCommunityChartContainer from "../../container/admin/community/AdminCommunityChartContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

const AdminCommunityChartPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));
  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <AdminCommunityChartContainer />
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

export default AdminCommunityChartPage;
