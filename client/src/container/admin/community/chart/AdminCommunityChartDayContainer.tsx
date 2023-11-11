import React from "react";
import { getCommunityDayChart } from "../../../../lib/api/admin";
import { Loading, LoadingImage } from "../../../auth/LoginForm";
import { ChartWrapper } from "../../home/visitor/AdminHomeVisitorContainer";
import AdminCommunityChartDay from "../../../../components/admin/community/chart/AdminCommunityChartDay";

const AdminCommunityChartDayContainer = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCommunityDayChart();
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
        <AdminCommunityChartDay data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminCommunityChartDayContainer;
