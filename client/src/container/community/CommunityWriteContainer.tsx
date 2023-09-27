import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityWrite from "../../components/community/CommunityWrite";
import { changeForm, initForm } from "../../modules/community/action";
import { RootState } from "../../modules";
import { useNavigate } from "react-router";

const CommunityWriteContainer = () => {
  const dispatch = useDispatch();
  const navicate = useNavigate();

  const { category, title, content } = useSelector(
    (state: RootState) => state.community.form
  );

  const onChangeForm = useCallback(
    (data: { key: string; value: string }) => {
      dispatch(changeForm({ key: data.key, value: data.value }));
    },
    [dispatch]
  );

  const onCancel = useCallback(() => {
    console.log("클릭");
    if (title !== "" || content !== "<p><br></p>") {
      console.log("아직 입력된 값이 있습니다. 정말 취소하겠습니까?");
    } else {
      console.log("이전화면으로");
      navicate(-1);
    }
  }, [content, title, navicate]);

  const onSubmit = useCallback(() => {
    console.log("클릭");
    if (category === "선택사항") {
      console.log("유형을 선택주세요.");
    } else if (title === "") {
      console.log("제목을 적어주세요.");
    } else if (content === "" || content === "<p><br></p>") {
      console.log("내용을 적어주세요.");
    } else {
      console.log("제출가능");
    }
  }, [category, title, content]);

  useEffect(() => {
    dispatch(initForm());
  }, []);

  return (
    <div>
      <CommunityWrite
        onChangeForm={onChangeForm}
        category={category}
        title={title}
        content={content}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default CommunityWriteContainer;
