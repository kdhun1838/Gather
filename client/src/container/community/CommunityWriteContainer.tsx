import { FormEvent, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityWrite from "../../components/community/CommunityWrite";
import { changeForm, initForm, saveForm } from "../../modules/community/action";
import { RootState } from "../../modules";
import { useNavigate } from "react-router";
import { CommunityState } from "../../modules/community/type";

const CommunityWriteContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useSelector((state: RootState) => state.community);

  const { category, title, content } = form.form || "";

  const onChangeForm = useCallback(
    (data: { key: string; value: string }) => {
      dispatch(changeForm({ name: "form", key: data.key, value: data.value }));
    },
    [dispatch]
  );

  const onCancel = useCallback(() => {
    if (title !== "" || (content !== "" && content !== "<p><br></p>")) {
      console.log("아직 입력된 값이 있습니다. 정말 취소하겠습니까?");
    } else {
      console.log("이전 화면으로");
      navigate(-1);
    }
  }, [content, title, navigate]);

  const onSubmit = useCallback(
    (e: FormEvent, form: CommunityState) => {
      //새로고침 로직삭제
      e.preventDefault();

      console.log("클릭");
      if (category === "선택사항") {
        console.log("유형을 선택주세요.");
      } else if (title === "") {
        console.log("제목을 적어주세요.");
      } else if (content === "" || content === "<p><br></p>") {
        console.log("내용을 적어주세요.");
      } else {
        console.log("제출가능");
        dispatch(saveForm(form));
        navigate("/community");
      }
    },
    [category, title, content, dispatch, navigate]
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
