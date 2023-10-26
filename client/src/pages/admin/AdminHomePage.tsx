import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import styled from "styled-components";
import AdminHomeContainer from "../../container/admin/home/AdminHomeContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

const AdminHomePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user,
  }));

  return (
    <div>
      {user.user.grade !== 1 ? (
        <>
          <AdminHeaderContainer />
          <AdminBody>
            <AdminHomeContainer />
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

export const AdminBody = styled.div`
  position: fixed;
  left: 280px;
  top: 50px;
  width: calc(100% - 280px);
  height: calc(100vh - 50px);
  overflow-y: auto;
  padding: 50px;
  background-color: #f2f2f2;
`;

export default AdminHomePage;
