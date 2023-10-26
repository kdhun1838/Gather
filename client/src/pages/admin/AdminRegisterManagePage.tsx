import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminRegisterManageContainer from "../../container/admin/register/AdminRegisterManageContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

const AdminRegisterManagePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));
  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <AdminRegisterManageContainer />
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

export default AdminRegisterManagePage;
