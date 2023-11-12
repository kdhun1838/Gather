import React from 'react';
import AdminUserChartDay from '../../../../components/admin/user/chart/AdminUserChartDay';
import { getUserDayChart } from '../../../../lib/api/admin';
import { Loading, LoadingImage } from '../../../auth/LoginForm';
import { ChartWrapper } from '../../home/visitor/AdminHomeVisitorContainer';

const AdminUserChartDayContainer = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserDayChart();
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
        <AdminUserChartDay data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminUserChartDayContainer;
