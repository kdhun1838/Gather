import React from "react";
import { getCommunityMonthChart } from "../../../../lib/api/admin";
import { ChartWrapper } from "../../home/visitor/AdminHomeVisitorContainer";
import { Loading, LoadingImage } from "../../../auth/LoginForm";
import AdminCommunityChartMonth from "../../../../components/admin/community/chart/AdminCommunityChartMonth";

const AdminCommunityChartMonthContainer = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCommunityMonthChart();
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <ChartWrapper>
      {loading ? (
        <Loading>
          <LoadingImage src="/loading.gif" alt="로딩 중" />
        </Loading>
      ) : (
        <AdminCommunityChartMonth data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminCommunityChartMonthContainer;
