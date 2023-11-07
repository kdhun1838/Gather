import React from "react";
import { getRegisterMonthChart } from "../../../../lib/api/admin";
import AdminRegisterChartMonth from "../../../../components/admin/register/chart/AdminRegisterChartMonth";
import { ChartWrapper } from "../../home/visitor/AdminHomeVisitorContainer";
import { Loading, LoadingImage } from "../../../auth/LoginForm";

const AdminRegisterChartMonthContainer = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getRegisterMonthChart();
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
        <AdminRegisterChartMonth data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminRegisterChartMonthContainer;
