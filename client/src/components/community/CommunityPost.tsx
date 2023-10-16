import React from "react";
import styled from "styled-components";
import { changeDate } from "./Community";
import CommunityCommentContainer from "../../container/community/CommunityCommentContainer";

const PostContainer = styled.div`
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 5rem;
`;

const TitleBox = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

const Title = styled.div`
  margin-top: 40px;
  font-weight: 800;
  font-size: 36px;
  line-height: 126.5%;
  letter-spacing: -0.005em;
  color: #000;
`;

const NameAndDateBox = styled.div`
  margin-top: 32px;
  padding-bottom: 32px;
  border-bottom: 3px solid #f2f2f2;
  display: flex;
  grid-gap: 15px;
  gap: 15px;
  align-items: center;

  .date {
    font-size: 18px;
    color: #717171;
  }

  .line {
    width: 2px;
    height: 20px;
    background-color: #e2e2e2;
  }
`;

const PostContentBox = styled.div`
  margin-top: 132px;
  font-size: 1.125rem;
  word-break: break-all;
  line-height: 1.7;
  letter-spacing: -0.004em;
`;

const ViewAndFavoriteBox = styled.div`
  margin-top: 20px;
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  align-items: center;
  gap: 10px;
  height: 20px;
`;

const CommentBox = styled.div`
  padding-bottom: 80px;
`;

export type PostType = {
  Favorite: boolean;
  category: string;
  communityNum: number;
  content: string;
  createdAt: string;
  detail: string;
  title: string;
  updatedAt: string;
  view: number;
};

type PostPropsType = {
  post: {
    updatedPost: PostType;
    getComment: string[];
  };
  load: {
    [key: string]: boolean;
  };
  onClickBack: () => void;
};

const CommunityPost: React.FC<PostPropsType> = ({
  post,
  load,
  onClickBack,
}) => {
  const loading = load["community/GET_POST"];

  const { updatedPost } = post;

  if (loading) {
    return <div>글 불러오는중... </div>;
  }

  return (
    <PostContainer>
      <TitleBox>
        <div onClick={onClickBack}>뒤로가기버튼</div>
        <Title>{updatedPost?.title}</Title>
        <NameAndDateBox>
          <div className="username"></div>
          <div className="line"></div>
          <div className="date">{changeDate(updatedPost?.createdAt)}</div>
        </NameAndDateBox>
      </TitleBox>
      <PostContentBox
        dangerouslySetInnerHTML={{ __html: updatedPost?.content }}
      ></PostContentBox>
      <ViewAndFavoriteBox>
        <div>조회수: {updatedPost?.view}</div>
        <div>즐겨찾기 버튼</div>
      </ViewAndFavoriteBox>
      <CommentBox>
        <CommunityCommentContainer />
      </CommentBox>
    </PostContainer>
  );
};

export default CommunityPost;
