import MyPage from '../../components/auth/MyPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';

const MyPageForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));
  return <MyPage />;
};

export default MyPageForm;
