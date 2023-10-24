import React from "react";
import AdminHeaderContainer from "../../container/common/AdminHeaderContainer";
import { AdminBody } from "./AdminHomePage";
import AdminCarouselChartContainer from "../../container/admin/carousel/AdminCarouselChartContainer";

const AdminCarouselChartPage = () => {
  return (
    <div>
      <AdminHeaderContainer />
      <AdminBody>
        <AdminCarouselChartContainer />
      </AdminBody>
    </div>
  );
};

export default AdminCarouselChartPage;
