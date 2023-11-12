import React from 'react';
import AdminUserChartGrade from '../../../../components/admin/user/chart/AdminUserChartGrade';
import { getUserChart } from '../../../../lib/api/admin';
import { Loading, LoadingImage } from '../../../auth/LoginForm';
import { ChartWrapper } from '../../home/visitor/AdminHomeVisitorContainer';

const AdminUserChartGradeContainer: React.FC = () => {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserChart();
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
        <AdminUserChartGrade data={data} />
      )}
    </ChartWrapper>
  );
};

export default AdminUserChartGradeContainer;
