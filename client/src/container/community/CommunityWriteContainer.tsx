import { FormEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommunityWrite from '../../components/community/CommunityWrite';
import { changeForm, initForm, saveForm } from '../../modules/community/action';
import { RootState } from '../../modules';
import { useNavigate } from 'react-router';
import { CommunityState } from '../../modules/community/type';

const CommunityWriteContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useSelector((state: RootState) => state.community);
  const user = useSelector((state: RootState) => state.user.user);

  const { category, title, content } = form.form || '';
  const userId = user.userNum || '';

  const onChangeForm = useCallback(
    (data: { key: string; value: string }) => {
      dispatch(changeForm({ name: 'form', key: data.key, value: data.value }));
    },
    [dispatch]
  );

  const onCancel = useCallback(() => {
    if (title !== '' || (content !== '' && content !== '<p><br></p>')) {
    } else {
      navigate(-1);
    }
  }, [content, title, navigate]);

  const onSubmit = useCallback(
    (e: FormEvent, form: CommunityState) => {
      //새로고침 로직삭제
      e.preventDefault();

      if (category === '선택사항') {
      } else if (title === '') {
      } else if (content === '' || content === '<p><br></p>') {
      } else {
        dispatch(saveForm(form, userId));
        navigate('/community');
      }
    },
    [category, title, content, dispatch, navigate, userId]
  );

  useEffect(() => {
    dispatch(initForm());
  }, [dispatch]);

  return (
    <div>
      <CommunityWrite
        onChangeForm={onChangeForm}
        form={form}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default CommunityWriteContainer;
