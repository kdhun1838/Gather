import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import AdminCommunityManageDetailContainer from "./../../container/admin/community/AdminCommunityManageDetailContainer";

const AdminCommunityManageDetailPage = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));
  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <AdminCommunityManageDetailContainer />
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

export default AdminCommunityManageDetailPage;
