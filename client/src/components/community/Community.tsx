import React from "react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div>
      게시물(전체보기, 후기, 질문, 잡담) 세부내용 선택{" "}
      <Link to="/community/write">글쓰기버튼</Link>
    </div>
  );
};

export default Community;
