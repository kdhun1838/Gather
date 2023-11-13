import { FormEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeForm,
  editPost,
  getEditPost,
} from '../../modules/community/action';
import { RootState } from '../../modules';
import { useNavigate, useParams } from 'react-router';
import CommunityEdit from '../../components/community/CommunityEdit';
import { FormType } from '../../modules/community/type';

interface OwnProps {
  isAdmin?: boolean;
}

const CommunityEditContainer: React.FC<OwnProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();

  const postId = param.postId || '';
  const form = useSelector((state: RootState) => state.community.form);

  const { category, title, content } = form || '';

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
    (e: FormEvent, form: Record<string, string>) => {
      //새로고침 로직삭제
      e.preventDefault();

      if (category === '선택사항') {
      } else if (title === '') {
      } else if (content === '' || content === '<p><br></p>') {
      } else {
        dispatch(editPost(form as FormType, postId));
        if (props.isAdmin) {
          navigate(`/admin/community/manage/detail/${postId}`);
        } else {
          navigate(`/community/${postId}`);
        }
      }
    },
    [category, title, content, dispatch, postId, navigate]
  );

  useEffect(() => {
    dispatch(getEditPost(postId));
  }, []);

  return (
    <div>
      <CommunityEdit
        onChangeForm={onChangeForm}
        form={form}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default CommunityEditContainer;
