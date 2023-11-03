import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import CommunityEditContainer from "../../container/community/CommunityEditContainer";

const AdminCommunityManageEditPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));
  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <CommunityEditContainer isAdmin={true} />
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

export default AdminCommunityManageEditPage;
