import React from 'react';
import { getUserMonthChart } from '../../../../lib/api/admin';
import AdminUserChartMonth from '../../../../components/admin/user/chart/AdminUserChartMonth';
import { ChartWrapper } from '../../home/visitor/AdminHomeVisitorContainer';
import { Loading, LoadingImage } from '../../../auth/LoginForm';

const AdminUserChartMonthContainer = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserMonthChart();
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
        <AdminUserChartMonth data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminUserChartMonthContainer;
