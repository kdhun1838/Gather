import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import styled from "styled-components";
import AdminHomeContainer from "../../container/admin/home/AdminHomeContainer";

const AdminHomePage: React.FC = () => {
  return (
    <div>
      <AdminHeaderContainer />
      <AdminBody>
        <AdminHomeContainer />
      </AdminBody>
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
