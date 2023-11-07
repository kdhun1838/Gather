import React from "react";
import AdminRegisterChartCategory from "../../../../components/admin/register/chart/AdminRegisterChartCategory";
import { getRegisterChart } from "../../../../lib/api/admin";
import { Loading, LoadingImage } from "../../../auth/LoginForm";
import { ChartWrapper } from "../../home/visitor/AdminHomeVisitorContainer";

const AdminRegisterChartCategoryContainer: React.FC = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getRegisterChart();
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
        <AdminRegisterChartCategory data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminRegisterChartCategoryContainer;
