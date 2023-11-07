import React from "react";
import AdminCommunityChartCategory from "../../../../components/admin/community/chart/AdminCommunityChartCategory";
import { getCommunityChart } from "../../../../lib/api/admin";
import { Loading, LoadingImage } from "../../../auth/LoginForm";
import { ChartWrapper } from "../../home/visitor/AdminHomeVisitorContainer";

const AdminCommunityChartCategoryContainer: React.FC = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCommunityChart();
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
        <AdminCommunityChartCategory data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminCommunityChartCategoryContainer;
