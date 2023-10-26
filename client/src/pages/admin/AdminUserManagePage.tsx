import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminUserManageContainer from "../../container/admin/user/AdminUserManageContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

const AdminUserManagePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));

  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <AdminUserManageContainer />
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

export default AdminUserManagePage;
