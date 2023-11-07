import React from "react";
import AdminRegisterChartDay from "../../../../components/admin/register/chart/AdminRegisterChartDay";
import { getRegisterDayChart } from "../../../../lib/api/admin";
import { Loading, LoadingImage } from "../../../auth/LoginForm";
import { ChartWrapper } from "../../home/visitor/AdminHomeVisitorContainer";

const AdminRegisterChartDayContainer = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getRegisterDayChart();
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
        <AdminRegisterChartDay data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminRegisterChartDayContainer;
