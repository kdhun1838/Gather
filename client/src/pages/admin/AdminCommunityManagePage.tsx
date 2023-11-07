import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminCommunityManageContainer from "../../container/admin/community/AdminCommunityManageContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

const AdminCommunityManagePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));
  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <AdminCommunityManageContainer />
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

export default AdminCommunityManagePage;
